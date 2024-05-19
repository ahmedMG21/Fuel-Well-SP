import json
import re
import base64
import os
import cv2
import numpy as np
from thefuzz import fuzz
import requests
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

class NutritionFactsExtractor:
    def __init__(self, normalization_dict=None):
        self.google_key = "YOUR-API-KEY"  # Replace with your actual API key
        self.normalization_dict = normalization_dict or {}

    def preprocess_image(self, image_path):
        image = cv2.imread(image_path)
        return image

    def detect_text(self, image_path):
        image = self.preprocess_image(image_path)
        _, image_encoded = cv2.imencode('.jpg', image)
        image_content = base64.b64encode(image_encoded).decode('utf-8')

        url = f"https://vision.googleapis.com/v1/images:annotate?key={self.google_key}"
        headers = {'Content-Type': 'application/json'}
        payload = json.dumps({
            "requests": [
                {
                    "image": {
                        "content": image_content
                    },
                    "features": [
                        {
                            "type": "TEXT_DETECTION"
                        }
                    ]
                }
            ]
        })

        response = requests.post(url, headers=headers, data=payload)
        if response.status_code == 200:
            response_json = response.json()
            text_annotations = response_json['responses'][0].get('textAnnotations', [])
            if text_annotations:
                return text_annotations[0]['description']
        return ''

    def extract_nutrition_facts(self, text):
        lines = text.split('\n')
        facts = {}
        num_lines = len(lines)

        for i, line in enumerate(lines):
            for key, values in self.normalization_dict.items():
                match_found = False
                for value in values:
                    if value.lower() in line.lower():
                        match = re.search(r"(\d+\.?\d*)", line)
                        if match:
                            facts[key] = match.group(1)
                            match_found = True
                            break
                        elif i + 1 < num_lines:
                            next_line = lines[i + 1]
                            match = re.search(r"(\d+\.?\d*)", next_line)
                            if match:
                                facts[key] = match.group(1)
                                match_found = True
                                break
                if match_found:
                    continue

                max_similarity = 90
                best_match = None
                for value in values:
                    similarity = fuzz.partial_ratio(line.lower(), value.lower())
                    if similarity > max_similarity:
                        max_similarity = similarity
                        best_match = value

                if not best_match and i + 1 < num_lines:
                    next_line = lines[i + 1]
                    for value in values:
                        similarity = fuzz.partial_ratio(next_line.lower(), value.lower())
                        if similarity > max_similarity:
                            max_similarity = similarity
                            best_match = value

                if best_match:
                    match = re.search(rf"{best_match}.*?(\d+\.?\d*)", line, re.IGNORECASE)
                    if not match and i + 1 < num_lines:
                        next_line = lines[i + 1]
                        match = re.search(rf"{best_match}.*?(\d+\.?\d*)", next_line, re.IGNORECASE)
                    if match:
                        facts[key] = match.group(1)
                        break

        return facts

    def validate_facts(self, facts):
        # Add validation logic to check the extracted values
        return facts

# FastAPI app setup
app = FastAPI()

class ImageUploadResponse(BaseModel):
    text: str
    facts: dict

@app.on_event("startup")
async def load_dictionaries():
    try:
        with open('dic/AR_dictionary.json', 'r', encoding='utf-8-sig') as ar_dict_file:
            ar_dict = json.load(ar_dict_file)

        with open('dic/EN_Dictionary.json', 'r') as en_dict_file:
            en_dict = json.load(en_dict_file)

        normalization_dict = {**ar_dict, **en_dict}
        app.state.extractor = NutritionFactsExtractor(normalization_dict)
    except Exception as e:
        print(f"Error loading dictionaries: {e}")
        raise

@app.post("/extract_nutrition_facts/", response_model=ImageUploadResponse)
async def extract_nutrition_facts(file: UploadFile = File(...)):
    try:
        # Create temp directory if it doesn't exist
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)
        
        # Save uploaded file
        file_location = f"{temp_dir}/{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())

        # Detect text from image
        extractor = app.state.extractor
        text = extractor.detect_text(file_location)
        if not text:
            raise HTTPException(status_code=400, detail="Text detection failed")

        # Extract nutrition facts
        facts = extractor.extract_nutrition_facts(text)
        facts = extractor.validate_facts(facts)

        # Clean up the saved file
        os.remove(file_location)

        return ImageUploadResponse(text=text, facts=facts)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
