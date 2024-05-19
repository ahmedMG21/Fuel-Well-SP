'use client'
// components/NutritionFactsTemp.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Divider, Grid, CardMedia } from '@mui/material';
import {Box as MuiBox} from '@mui/system';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Box from 'next-auth/providers/box';
type Props = {
    product_name: string;
    product_image: string;
    servingSize: string;
    calories: string;
    totalFat?: string;
    saturatedFat?: string;
    transFat?: string;
    cholesterol?: string;
    sodium?: string;
    carbs?: string;
    dietaryFiber?: string;
    totalSugar?: string;
    addedSugar?: string;
    protein?: string;
}

export default function NutritionFactsCard(props: Props) {
    const [open, setOpen] = useState<boolean>(false);



    const closeModal = () => {
        setOpen(false);
    }
    // Image modal component
    const ImageModal = () => {

        return (
            <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
            onClick={closeModal}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={props.product_image}
                alt="product"
                style={{
                    maxWidth: '80%',
                    maxHeight: '80%',
                    objectFit: 'contain',
                }}
            />
        </div>
        )
    }

    
    // Function to show a bigger image when clicked
    const imageClicked = () => {
        // Show a bigger image
        console.log('Image clicked', props.product_image);
        // Add a modal or something to show the image bigger
        //use image modal to show the image bigger
        setOpen(true);

    }
    return (
    <>

         <MuiBox
         sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
         }}
         >
        <Card raised sx={{ maxWidth: 345, my: 2 }}>
            {/*card media is large and if photo been clicked show it bigger */}
            <CardMedia
                component="img"
                height="140"
                image={props.product_image}
                alt={props.product_name}
                sx={{ objectFit: 'contain' }}
                onClick={() => {imageClicked()}}
                
            />
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {props.product_name}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom color='green' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Nutrition Facts
                </Typography>
                <Divider sx={{ my: 1, bgcolor: "black", height: 2 }} />

                <Typography variant="body2" component="div" gutterBottom>
                    Serving size: {props.servingSize} g
                </Typography>
                <Typography variant="body2" component="div" gutterBottom>
                    Calories: {props.calories}
                </Typography>
                <Divider sx={{ my: 1, bgcolor: "black", height: 2 }} />

                {props.totalFat && (
                    <React.Fragment>
                        <Typography variant="body2" component="div" fontWeight="bold">
                            Total Fat {props.totalFat} g
                        </Typography>
                        <Divider sx={{ my: 1, bgcolor: "black" }} />
                    </React.Fragment>
                )}

                {props.saturatedFat && (
                    <Typography variant="body2" component="div" sx={{ ml: 3 }}>
                        Saturated Fat {props.saturatedFat} g
                    </Typography>
                )}

                {props.transFat && (
                    <Typography variant="body2" component="div" sx={{ ml: 3 }}>
                        Trans Fat {props.transFat} g
                    </Typography>
                )}

                {props.cholesterol && (
                    <React.Fragment>
                        <Divider sx={{ my: 1, bgcolor: "black" }} />
                        <Typography variant="body2" component="div" fontWeight="bold">
                            Cholesterol {props.cholesterol} mg
                        </Typography>
                    </React.Fragment>
                )}

                {props.sodium && (
                    <React.Fragment>
                        <Divider sx={{ my: 1, bgcolor: "black" }} />
                        <Typography variant="body2" component="div" fontWeight="bold">
                            Sodium {props.sodium} mg
                        </Typography>
                    </React.Fragment>
                )}

                {props.carbs && (
                    <React.Fragment>
                        <Divider sx={{ my: 1, bgcolor: "black" }} />
                        <Typography variant="body2" component="div" fontWeight="bold">
                            Total Carbohydrate {props.carbs} g
                        </Typography>
                    </React.Fragment>
                )}

                {props.dietaryFiber && (
                    <Typography variant="body2" component="div" sx={{ ml: 3 }}>
                        Dietary Fiber {props.dietaryFiber} g
                    </Typography>
                )}

                {props.totalSugar && (
                    <Typography variant="body2" component="div" sx={{ ml: 3 }}>
                        Total Sugars {props.totalSugar} g
                    </Typography>
                )}

                {props.addedSugar && (
                    <Typography variant="body2" component="div" sx={{ ml: 3 }}>
                        Added Sugars {props.addedSugar} g
                    </Typography>
                )}

                {props.protein && (
                    <React.Fragment>
                        <Divider sx={{ my: 1, bgcolor: "black" }} />
                        <Typography variant="body2" component="div" fontWeight="bold">
                            Protein {props.protein} g
                        </Typography>
                    </React.Fragment>
                )}

                <Divider sx={{ my: 1, bgcolor: "black", height: 2 }} />

                {/* Add more nutritional information as needed */}
            </CardContent>
        </Card>
        </MuiBox>
        {/* Show the image modal */}
        {open && <ImageModal />}
    </> 
    );
}
