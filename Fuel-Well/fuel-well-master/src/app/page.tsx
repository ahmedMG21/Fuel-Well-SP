'use client'
import React, { useState, useEffect } from 'react';
import { Typography, Box, AppBar, Toolbar, Button, IconButton, InputBase, Modal, useMediaQuery, List, ListItem, ListItemText, Divider, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ProductCard from './components/ProductCard';
import AdvancedFilter from './components/AdvancedFilter';
import Image from 'next/image';
import { getFirestore, collection, query, where, getDocs, CollectionReference, DocumentData } from 'firebase/firestore';
import app from './../../firebase';
import { set } from 'firebase/database';
import { link } from 'fs';
import {Provider} from 'react-redux';
import {store} from './store/store';
//import redux to get the values of the advanced filter
import { useSelector } from 'react-redux';
import { selectSliderValues } from './store/advancedFilterInputSlice';
import { RootState } from './store/store';


interface Product {
  [key: string]: number; // Assuming all values you filter by are numbers
}
interface SliderValues {
  [key: string]: [any, any]; // Tuple type for range [min, max]
}

const pages = ['All', 'Beverages', 'Snacks', 'Canned Food', 'Frozen Food', 'Sweets', 'Organic Food'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function Home() {
    const db = getFirestore(app);
    const [allProducts, setAllProducts] = useState<any>([]); // State for storing all products from Firebase
    const [products, setProducts] = useState<any>([]); // State for storing filtered/searched products
    const [selectedCategory, setSelectedCategory] = useState<any>('Random');
    const [loading, setLoading] = useState<any>(true);
    const [error, setError] = useState<any>(null);
    const [filterOpen, setFilterOpen] = useState<any>(false);
    const [filterSliderValues, setFilterSliderValues] = useState<any>([0, 100]);
    const [searchInput, setSearchInput] = useState<any>('');
    const sliderValues = useSelector(selectSliderValues);
    const theme: any = useTheme();
    const isMobile: any = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState<any>(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{
        backgroundColor: theme.palette.primary.main,
    }}>

      {/* Add the logo to the drawer from images/logo.png */}
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Image src="/images/logo.png" alt="food icon" width={50} height={50} />
      </Box>
      {/* Add the list of pages and about page to the drawer */}
        <Divider />
        <List>
            {pages.map((page) => (
                <ListItem button key={page} onClick={() => handleCategoryClick(page)} sx={{

                }}>
                    <ListItemText primary={page} />
                </ListItem>
            ))}
            <ListItem button onClick={() => window.location.href = '/about'}>
                <ListItemText primary="About" />
            </ListItem>
        </List>
    </div>
);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let productsCollection: any = collection(db, 'products');
                if (selectedCategory !== 'Random' && selectedCategory !== 'All') {
                    const selectedCategoryFirebase = selectedCategory.toLowerCase().replace(' ', '_');
                    productsCollection = query(productsCollection, where('category', '==', selectedCategoryFirebase));
                }
                const productsSnapshot: any = await getDocs(productsCollection);
                





                // Map through the products and store them in the state
                let fetchedProducts: any = productsSnapshot.docs.map((doc: { id: any; data: () => any; }) => ({ id: doc.id, ...doc.data() }));
                //filter the products based on the advanced filter values and if the product does not meet the criteria, remove it from the fetched products
                // also if the product does not have the value for the filter don't remove it
                fetchedProducts = fetchedProducts.filter((product: any) => {
                  let pass = true;
                  for (const key in sliderValues as Record<string, [number, number]>) {
                    if (product[key] === undefined) continue;
                    if (product[key] < (sliderValues as Record<string, [number, number]>)[key][0] || product[key] > (sliderValues as Record<string, [number, number]>)[key][1]) {
                      pass = false;
                      break;
                    }
                  }
                  return pass;
                });
                console.log(fetchedProducts);

                setAllProducts(fetchedProducts);
                setProducts(fetchedProducts);
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory, sliderValues]);

    useEffect (() => {
      //searched(searchInput);
      searched(searchInput);
    }
    , [searchInput]);
    const searched = (inputEvent: string) => {
        const filteredProducts: any = allProducts.filter((product: any) => product['product_name'].toLowerCase().includes(inputEvent.toLowerCase()));
        setProducts(filteredProducts);
        console.log(inputEvent);
    };

    const handleCategoryClick = (category: React.SetStateAction<string>) => setSelectedCategory(category);
    const filterHandleClose = () => setFilterOpen(false);
    const filterHandleSliderChange = (index: string | any) => (newValue: number | number[]) => {
        const newValues = [...filterSliderValues];
        newValues[index] = Array.isArray(newValue) ? newValue[0] : newValue;
        setFilterSliderValues(newValues);
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Image src="/images/loading_spinner.gif" alt="loading" width={200} height={200} /></div>;
    if (error) return <Typography>Error: {error.message}</Typography>;


 
      const handleOpenAdvancedFilter = () => {
        setFilterOpen(true);
      };

    return (
        <>
            <AppBar position="static" sx={
                {



                    
                }
            } >
        
            
                {/* add toolbar  and center buttons*/}
                <Toolbar >
                        {isMobile ? (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>

                    ) : null}
                    {/* add icon image */}
                    {!isMobile ? (
                    <Typography sx={{
                       
                       //elements should be in left side
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        marginRight: 'auto'
                    
                        
                    
                    }}>
                       
                   <Image src="/images/logo.png" alt="food icon" width={50} height={50}  />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Fuel well
                    </Typography>
                    </Typography>
                    ) : null}


                    {!isMobile ? (
                    <Box  sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }} >
                 {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={() => handleCategoryClick(page)}
                            sx={{ 
                                color: 'white',
                                display: 'block',
                                //add hover effect
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                },


                            }}
                            
                            >
                            {page}
                        </Button>
                    ))}

                    <Button sx={
                        {
                            color: 'gray',
                            display: 'block',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                            },
                        }
                    } 
                    onClick={() => window.location.href = '/about'}
                    >About</Button>
                    </Box>
                    ) : null}
                    <IconButton
            edge="end"
            color="inherit"
            aria-label="advanced filter"
            onClick={handleOpenAdvancedFilter}
          >
            <SettingsIcon
            sx={{
                //add hover effect
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                },
            
            }}
            />
          </IconButton>
                 <Search
            sx={{ 
                width: 'auto',
                marginLeft: 'auto',
                //add hover effect
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                },
            }}
                 >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) =>setSearchInput(e.target.value)}
              value={searchInput}
              //set the value of search input to what the user types
              

            />
          </Search>


         </Toolbar>

            </AppBar>
            <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { width: '30%', backgroundColor: theme.palette.primary.main },
            }}
        >
            {drawer}
        </Drawer>

            
            <Box mt={2} display="flex" justifyContent="center" alignItems="center" flexWrap="wrap" gap={2}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ 
                    textAlign: 'center',
                    marginTop: '20px',
                    width: '100%'
                }}>
                    {selectedCategory === 'Random' ? 'Random Products for You' : `${selectedCategory} Products for You`}
                </Typography>
                {products.map((product: any , index:any) => (
                    <ProductCard
                        key={index}
                        product_name={product['product_name']}
                        product_image={product['product_image']}
                        calories={product['Calories']}
                        totalFat={product['Total Fat']}
                        saturatedFat={product['Saturated Fat']}
                        servingSize={product['Serving Size']}
                        totalSugar={product['Total Sugar']}
                        protein={product['Protien']}
                        sodium={product['Sodium']}
                        cholesterol={product['Cholesterol']}
                        dietaryFiber={product['Dietary Fiber']}
                        carbs={product['Total Carbs']}
                        addedSugar={product['Added Sugar']}
                    />
                ))}
            </Box>

            <Modal
            open={filterOpen}
            onClose={filterHandleClose}
            aria-labelledby="advanced-filter"
            //cetner the modal
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
              {/* set the values of the advanced filter values from redux */}
                <AdvancedFilter
                    sliderValues={sliderValues}
                    handleSliderChange={filterHandleSliderChange}
                    handleClose={filterHandleClose}
                />
            </Modal>
        </>
    );
}
