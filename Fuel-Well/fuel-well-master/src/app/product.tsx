'use client'

import * as React from 'react';
import { Button, Box, Card, CardActions, CardContent, CardMedia, Typography, Stack } from '@mui/material';
import NavBar from './components/Navbar';
import NutritionFactsTemp from './components/NutritionFactsTemp';
import { SnackbarProvider } from 'notistack';
export default function Home() {
    return (
        <>
            <SnackbarProvider maxSnack={3}>
                <NavBar />
                <main>
                    <Box mt={2} display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" gap={2}>
          
                    </Box>
                </main>
            </SnackbarProvider>
        </>
    );
}
