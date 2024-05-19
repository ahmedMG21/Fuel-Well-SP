//create product form for firestore

import { useNotify,Create, SimpleForm, TextInput, NumberInput, ImageInput, ImageField,SelectField,SelectInput, Toolbar, SaveButton} from 'react-admin';
import {useForm, useFormContext} from 'react-hook-form';
//import react hook form
import Reacthookform from 'react-hook-form';
//use ai api as an option that uploads a nutrition facts image and extacts the text from it to fill the nutrition facts fields automatically 

const   NutritionFactsImageAiExtractor = (...props: any) => {
    // use ai api to extract the text from the image and fill the nutrition facts fields automatically
    // use the extracted text to fill the fields
    const {setValue} = useFormContext();
    //get value from the form
    const {getValues} = useFormContext();
    const notify = useNotify();
    const dictitionary: any = {
        "serving size": [
        "serving size",
        "حجم الحصة"
        ],
        "total fat": [
        "total fat",
        "الدهون الكلية"
        ],
        "calories": [
        "calories",
        "السعرات الحرارية"
        ],
        "saturated fat": [
        "saturated fat",
        "دهون مشبعة"
        ],
        "total carbohydrate": [
        "total carbohydrate",
        "الكربوهيدرات الكلية"
        ],
        "dietary fiber": [
        "dietary fiber",
        "الألياف الغذائية"
        ],
        "total sugar": [
        "total sugar",
        "السكريات الكلية"
        ],
        "added sugar": [
        "added sugar",
        "سكر مضاف"
        ],
        "protein": [
        "protein",
        "بروتين"
        ],
        }
        const dataConverter = (data: any) => {
            let facts: any = {};
            /*          calories: data[dictitionary.calories[0]] || data[dictitionary.calories[1]],
                total_fat: data[dictitionary["total fat"][0]] || data[dictitionary["total fat"][1]],
                saturated_fat: data[dictitionary["saturated fat"][0]] || data[dictitionary["saturated fat"][1]],
                serving_size: data[dictitionary["serving size"][0]] || data[dictitionary["serving size"][1]],
                total_sugar: data[dictitionary["total sugar"][0]] || data[dictitionary["total sugar"][1]],
                protein: data[dictitionary.protein[0]] || data[dictitionary.protein[1]],
                dietary_fiber: data[dictitionary["dietary fiber"][0]] || data[dictitionary["dietary fiber"][1]],
                carbs: data[dictitionary["total carbohydrate"][0]] || data[dictitionary["total carbohydrate"][1]],
                added_sugar: data[dictitionary["added sugar"][0]] || data[dictitionary["added sugar"][1]], */



            

            interface Facts {
                [key: string]: string;
            }

       

            //convert the arabic nutrition facts to english nutrition facts in the keys
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    const element = data[key];
                    if (element) {
                        let newKey = key;
                        for (const dictKey in dictitionary) {
                            if (Object.prototype.hasOwnProperty.call(dictitionary, dictKey)) {
                                const dictElement: any = dictitionary[dictKey];
                                if (dictElement.includes(key)) {
                                    newKey = dictKey;
                                    break;
                                }
                            }
                        }
                        facts[newKey] = element;
                    }
                }
            }

            

            //convert the arabic numbers to english numbers in the values
            for (const key in facts) {
                if (Object.prototype.hasOwnProperty.call(facts, key)) {
                    const element = facts[key as keyof Facts];
                    if (element) {
                        facts[key] = element.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d: string) {
                            return d.charCodeAt(0) - 1632;
                        });
                    }
                }
            }

                        //if values are not found in data, set them to (-) to avoid errors
            const keys = ['calories', 'total fat', 'saturated fat', 'serving size', 'total sugar', 'protein', 'sodium', 'cholesterol', 'dietary fiber', 'carbs', 'added sugar'];
            for (const key of keys) {
                if (!facts[key]) {
                    facts[key] = '-';
                }
            }

            console.log('facts: ', facts);
            return {
                facts: facts,
            }
        }
        let formData = new FormData();        
    // handle the click event to extract the text from the image and fill the fields
    const handleClick = async () => {
        console.log('clicked');
        event?.preventDefault();
        
        

        const aiApi = 'https://fast-api-extractor-be2a8087707e.herokuapp.com/extract_nutrition_facts/';
        let formData = new FormData();
        let image = getValues('product_nutrition_facts_image');
        image = image.rawFile;
        //the image is file
        formData.append('file', image);
        //send the image to the api to extract the text from it
    
        console.log('Extracting Nutrition Facts...');
        notify('Extracting Nutrition Facts...');
        //key value pair for the image
    
        try {
            const response = await fetch(aiApi, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });
            console.log(response);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to extract nutrition facts');
            }
    
            let data = await response.json();
            console.log("data before convert: ", data);

            data = dataConverter(data.facts);


    
            console.log("data after ",data);

            setValue('Calories', data.facts['calories']);
            setValue('Total Fat', data.facts['total fat']);
            setValue('Saturated Fat', data.facts['saturated fat']);
            setValue('Serving Size', data.facts['serving size']);
            setValue('Total Sugar', data.facts['total sugar']);
            setValue('Protien', data.facts['protein']);
            setValue('Soduim', data.facts['sodium']);
            setValue('Cholestrol', data.facts['cholesterol']);
            setValue('Dietary Fiber', data.facts['dietary fiber']);
            setValue('Total Carbs', data.facts['total carbohydrate']);
            setValue('Added Sugar', data.facts['added sugar']);
    
            console.log('Nutrition Facts Extracted');
            notify('Nutrition Facts Extracted', { type: 'success' });
        } catch (error: any) {
            console.error('Error:', error.message);
            notify('Error:', error.message);
        }
    };
   

    //return as a button that the user can click to fill the fields
    return (
        <button onClick={handleClick}
        type='button'
        style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            margin: '10px',
            
          
        }}>Extract Nutrition Facts</button>
    );
}
const ProductCreateToolbar = (props: any) => (
    <Toolbar {...props}>
        <SaveButton  />
        <NutritionFactsImageAiExtractor />
    </Toolbar>
)

export const ProductCreate = (props: any) => (
    <Create {...props} >

        <SimpleForm toolbar={<ProductCreateToolbar/>}>


            
            <TextInput source="product_name" />
            <ImageInput source="product_image" label="Product Image" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ImageInput source="product_nutrition_facts_image" label="nutrition facts Image" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>

            <SelectInput source="category" choices={[
                { id: 'beverages', name: 'Beverages' },
                { id: 'snacks', name: 'Snacks' },
                { id: 'canned_food', name: 'Canned Food' },
                { id: 'frozen_food', name: 'Frozen Food' },
                { id: 'sweets', name: 'Sweets' },
                { id: 'organic_food', name: 'Organic Food' },
            ]}/>
            <TextInput source="calories" name='Calories'/>
            <TextInput source="total_fat" name='Total Fat' />
            <TextInput source="saturated_fat" name='Saturated Fat' />
            <TextInput source="serving_size" name='Serving Size'/>
            <TextInput source="total_sugar" name='Total Sugar'/>
            <TextInput source="protein" name='Protien'/>
            <TextInput source="sodium" name='Soduim' />
            <TextInput source="cholesterol" name='Cholestrol' />
            <TextInput source="dietary_fiber" name='Dietary Fiber'/>
            <TextInput source="carbs" name='Total Carbs' />
            <TextInput source="added_sugar" name='Added Sugar'/>
        </SimpleForm>
    </Create>
);