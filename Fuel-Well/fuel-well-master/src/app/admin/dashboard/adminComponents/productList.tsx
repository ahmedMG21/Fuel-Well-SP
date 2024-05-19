import {List,Show, SimpleShowLayout, TextField, DateField, NumberField, ReferenceField, ReferenceManyField, Datagrid, EditButton, ImageField, TopToolbar,SelectColumnsButton, SearchInput, TextInput, SelectInput } from 'react-admin';
//hide select table button 
const listActions  = (props: any) => (
    <TopToolbar {...props}>
        <SelectColumnsButton />
    </TopToolbar>
);

const postFilters = [ 
<SearchInput key="product_name" source="product_name" alwaysOn />,
<SelectInput key="category" source="category" choices={[
    { id: 'beverages', name: 'Beverages' },
    { id: 'snacks', name: 'Snacks' },
    { id: 'canned_food', name: 'Canned Food' },
    { id: 'frozen_food', name: 'Frozen Food' },
    { id: 'Sweets', name: 'Sweets' },
    { id: 'organic_food', name: 'Organic Food' },
]} />,

];



export const ProductList = (props: any) => (
    <List {...props} filters={postFilters}>
         
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="Total Fat" />
            <TextField source="Total Carbs" />
            <TextField source="Saturated Fat" />
            <TextField source="Calories" />
            <TextField source="Protien" />
            <DateField source="created_at" />
            <TextField source="Added Sugar" />
            <TextField source="product_name" />
            <TextField source="Cholestrol" />
            <TextField source="Serving Size" />
            <TextField source="Dietary Fiber" />
            <TextField source="Soduim" />
            <TextField source="category" />
            <TextField source="Total Sugar" />
            <ImageField source="product_image" />
            <ImageField source="product_nutrition_facts_image" />
        </Datagrid>
    
    </List>

);