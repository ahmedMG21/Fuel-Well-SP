'use client'; // Ensure this is at the top of your file

import * as React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import AdvancedFilter from './AdvancedFilter';

const pages = ['Beverages', 'Snacks', 'Canned Food', 'Frozen Food', 'Sweets', 'Organic Food'];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

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

export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [clickedItem, setClickedItem] = React.useState({ key: '', type: '' });
  const [open, setOpen] = useState(false);
  const [sliderValues, setSliderValues] = useState([30, 50, 20, 60, 10]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenAdvancedFilter = () => setOpen(true);
  const handleSliderChange = (index: number) => (newValue: number | number[]) => {
    const newValues = [...sliderValues];
    newValues[index] = Array.isArray(newValue) ? newValue[0] : newValue;
    setSliderValues(newValues);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget as unknown as React.SetStateAction<null>);
    console.log('nav menu clicked');
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget as unknown as React.SetStateAction<null>);
    console.log('user menu clicked');
  };
  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
    console.log('nav menu closed');
    if (event.currentTarget.hasAttribute('data-key')) {
      setClickedItem({
        key: event.currentTarget.getAttribute('data-key') || '',
        type: 'nav',
      });
    } else {
      setClickedItem({ key: 'null', type: 'nav' });
    }
  };
  const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(null);
    console.log('user menu closed');
    if (event.currentTarget.hasAttribute('data-key')) {
      setClickedItem({
        key: event.currentTarget.getAttribute('data-key') || '',
        type: 'user',
      });
    } else {
      setClickedItem({ key: 'null', type: 'user' });
    }
  };
  useEffect(() => {
    if (clickedItem.key !== '') {
      console.log('Clicked Item:', clickedItem);
    }
  }, [clickedItem]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Avatar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} src="/images/logo.png" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Nutritional Information
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="advanced filter"
            onClick={handleOpenAdvancedFilter}
          >
            <SettingsIcon />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button color="inherit">Home</Button>
        </Toolbar>

        <Container maxWidth={false}  sx={
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          //background color a little transparent and light
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: 'white',
          //fill the entire width of the container
          width: '100%',
        }
        }>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  data-key={page} // Example: Use the page name as the key
                  sx={{ my: 2,
                     color: 'white', 
                     display: 'block',
                    ":hover": {
                      border: '1px solid green',
                      borderRadius: '5px',
                      transition: 'border 0.3s ease-in-out',
                    }
                    }
                  //add a border animation on hover

                  


              }
                  

                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AdvancedFilter
        open={open}
        onClose={handleClose}
        sliderValues={sliderValues}
        handleSliderChange={handleSliderChange}
      />

    </>
  );
}











// 'use client'; // Ensure this is at the top of your file

// import * as React from 'react';
// import { useEffect } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

// const pages = ['Products', 'Pricing', 'Blog', 'admin'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// export default function NavBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const [clickedItem, setClickedItem] = React.useState({ key: '', type: '' });

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget as unknown as React.SetStateAction<null>);
//     console.log('nav menu clicked');
//   };

//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget as unknown as React.SetStateAction<null>);
//     console.log('user menu clicked');
//   };

//   const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(null);
//     console.log('nav menu closed');

//     if (event.currentTarget.hasAttribute('data-key')) {
//       setClickedItem({
//         key: event.currentTarget.getAttribute('data-key') || '',
//         type: 'nav',
//       });
//     } else {
//       setClickedItem({ key: 'null', type: 'nav' });
//     }
//   };

//   const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(null);
//     console.log('user menu closed');

//     if (event.currentTarget.hasAttribute('data-key')) {
//       setClickedItem({
//         key: event.currentTarget.getAttribute('data-key') || '',
//         type: 'user',
//       });
//     } else {
//       setClickedItem({ key: 'null', type: 'user' });
//     }
//   };

//   // Logic to handle clicked items
//   useEffect(() => {
//     if (clickedItem.key !== '') {
//       console.log('Clicked Item:', clickedItem);

//       // Replace with your desired actions based on clickedItem.key and clickedItem.type
//       switch (clickedItem.key) {
//         case 'Products':
//           // Handle Products click
//           break;
//         case 'Pricing':
//           // Handle Pricing click
//           break;
//         // ... (add cases for other buttons)
//         case 'admin':
//           window.location.href = '/admin';
//           break;

//         default:
//           // Handle cases where the key doesn't match
//       }
//     }
//   }, [clickedItem]);

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* ... (Your existing AppBar Code) */}

//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 data-key={page} // Example: Use the page name as the key
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           {/* ... (Rest of your AppBar Code) */}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
