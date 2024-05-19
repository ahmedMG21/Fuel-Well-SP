import json
import re
import base64  # For encoding image to base64
import os  # For file operations
import cv2  # OpenCV for image processing
import numpy as np  # For numerical operations
from thefuzz import fuzz  # For string similarity matching
import requests  # For making API calls
from fastapi import FastAPI, File, UploadFile, HTTPException  # FastAPI components
from fastapi.responses import JSONResponse  # For JSON responses
from pydantic import BaseModel  # For data validation and parsing

# Class to handle nutrition facts extraction
class NutritionFactsExtractor:
    def __init__(self, normalization_dict=None):
        self.google_key = "YOUR-API-KEY"  # Replace with your actual API key
        self.normalization_dict = normalization_dict or {}  # Dictionary for normalizing nutrition fact names

    def preprocess_image(self, image_path):
        # Load the image from the given path
        image = cv2.imread(image_path)
        return image

    def detect_text(self, image_path):
        # Preprocess the image
        image = self.preprocess_image(image_path)
        # Encode the image to base64
        _, image_encoded = cv2.imencode('.jpg', image)
        image_content = base64.b64encode(image_encoded).decode('utf-8')

        # Set up the request to the Google Vision API
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

        # Send the request and process the response
        response = requests.post(url, headers=headers, data=payload)
        if response.status_code == 200:
            response_json = response.json()
            text_annotations = response_json['responses'][0].get('textAnnotations', [])
            if text_annotations:
                return text_annotations[0]['description']  # Return detected text
        return ''

    def extract_nutrition_facts(self, text):
        # Split text into lines
        lines = text.split('\n')
        facts = {}
        num_lines = len(lines)

        # Iterate over each line to find and extract nutrition facts
        for i, line in enumerate(lines):
            for key, values in self.normalization_dict.items():
                match_found = False
                # Check for direct matches in the line
                for value in values:
                    if value.lower() in line.lower():
                        match = re.search(r"(\d+\.?\d*)", line)
                        if match:
                            facts[key] = match.group(1)
                            match_found = True
                            break
                        elif i + 1 < num_lines:
                            # Check the next line if no match in the current line
                            next_line = lines[i + 1]
                            match = re.search(r"(\d+\.?\d*)", next_line)
                            if match:
                                facts[key] = match.group(1)
                                match_found = True
                                break
                if match_found:
                    continue

                # If no direct match, use fuzzy matching
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
        # Placeholder for validation logic, if needed
        return facts

# FastAPI app setup
app = FastAPI()

# Pydantic model for response
class ImageUploadResponse(BaseModel):
    text: str
    facts: dict

# Load normalization dictionaries on startup
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

# Endpoint for extracting nutrition facts from uploaded image
@app.post("/extract_nutrition_facts/", response_model=ImageUploadResponse)
async def extract_nutrition_facts(file: UploadFile = File(...)):
    try:
        # Create temporary directory for saving the uploaded file
        temp_dir = "temp"
        os.makedirs(temp_dir, exist_ok=True)
        
        # Save the uploaded file to the temporary directory
        file_location = f"{temp_dir}/{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())

        # Detect text from the image
        extractor = app.state.extractor
        text = extractor.detect_text(file_location)
        if not text:
            raise HTTPException(status_code=400, detail="Text detection failed")

        # Extract nutrition facts from the detected text
        facts = extractor.extract_nutrition_facts(text)
        facts = extractor.validate_facts(facts)

        # Clean up the saved file
        os.remove(file_location)

        # Return the response
        return ImageUploadResponse(text=text, facts=facts)
    except Exception as e:
        # Handle exceptions and return appropriate error message
        raise HTTPException(status_code=500, detail=str(e))
