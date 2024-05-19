// components/ProductCard.tsx

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Dialog, DialogContent, CardActionArea, Modal } from '@mui/material';
import NutritionFactsTemp from './NutritionFactsTemp';
import { doc } from 'firebase/firestore';

type Props = {
    product_name: string;
    product_image: string;
    calories: string;
    totalFat: string;
    saturatedFat: string;
    servingSize: string;
    totalSugar: string;
    protein: string;
    sodium: string;
    cholesterol: string;
    dietaryFiber: string;
    carbs: string;
    addedSugar: string;
}

export default function ProductCard(props: Props) {
    const [open, setOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState<number>(0);


    const openModal = () => {
        setOpen(true);
        setScrollPosition(window.scrollY);
    }

    const closeModal = () => {
        setOpen(false);
        window.scrollTo(0, scrollPosition);
    }

    return (
        <>
<Card sx={{ 
    maxWidth: 300, 
    width: 300, 
    height: 350, 
    my: 2, 
    display: 'flex',  // Added display flex to the card
    flexDirection: 'column',  // Ensures vertical layout of content
    justifyContent: 'space-between',  // Maximizes space between content sections
    textAlign: 'center'  // Centers text content
}}>
    <CardMedia
        component="img"
        height="140"
        image={props.product_image}
        alt={props.product_name}
        sx={{
            objectFit: 'contain',
            marginTop: '10px'
        }}
    />
    <CardContent>
        <Typography gutterBottom variant="h6" component="div">
            {props.product_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Calories: {props.calories}
        </Typography>
    </CardContent>
    <CardActions disableSpacing sx={{
        p: 0,
        width: '100%',  // Make sure it takes full width
        display: 'flex',  // Ensures that flex properties apply
        justifyContent: 'flex-start',  // Aligns content to the left
        alignSelf: 'flex-end',  // Aligns itself to the end of the flex container
        marginTop: 'auto'  // Pushes to the bottom
    }}>
        <Button size="small" onClick={openModal}    >Show Details</Button>
    </CardActions>
</Card>

            <Modal open={open} onClose={closeModal}
            
            style={{


            }}
        
            
            >
                
                <NutritionFactsTemp
                    product_name={props.product_name}
                    product_image={props.product_image}
                    servingSize={props.servingSize}
                    calories={props.calories}
                    totalFat={props.totalFat}
                    saturatedFat={props.saturatedFat}
                    sodium={props.sodium}
                    cholesterol={props.cholesterol}
                    dietaryFiber={props.dietaryFiber}
                    carbs={props.carbs}
                    addedSugar={props.addedSugar}
                    protein={props.protein}
                    totalSugar={props.totalSugar}
                />
       
            </Modal>
        </>
    );
}
