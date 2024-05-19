'use client';

import Link from "next/link";
import { Button, Typography, Box, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import Image from "next/image";

const StyledPaper = styled(Paper)(({ theme }) => ({
    // transparent background
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: theme.spacing(4),
  borderRadius: '50px',
  boxShadow: theme.shadows[5],
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
}));

export default function About() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        alignContent: 'center',
        
        p: 3
      }}
    >
      <StyledPaper>
        <Image src="/images/logo.png" alt="Fuel Well Logo" width="100" height="100" />
        <Typography variant="h2" color="primary" gutterBottom>
          About Fuel Well
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
          Discovering Nutrition Transparency
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, maxWidth: '600px'}}>
          At Fuel Well, our mission is to empower you with the knowledge to make informed nutritional choices.
          Understanding what goes into your food is the first step towards a healthier lifestyle. Our platform
          provides detailed and accessible nutrition facts about a wide range of food products.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Developed by a passionate team of three software engineers, Fuel Well is designed to be your go-to
          resource for all things nutrition. We strive to bring clarity and convenience to the world of food
          data, helping you to fuel well every day.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/" passHref>
            <Button variant="contained" color="primary">
              Go Home
            </Button>
          </Link>
        </Box>
      </StyledPaper>
    </Box>
  );
}
