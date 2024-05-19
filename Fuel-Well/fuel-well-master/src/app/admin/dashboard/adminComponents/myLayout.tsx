//src/MyLayout.js
import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, Toolbar, UserMenu, useLogout, Sidebar, SearchInput } from 'react-admin';
import { MenuItem, MenuItemProps } from '@mui/material';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';
import Cookies from 'universal-cookie';
import { destroyCookie } from 'nookies';

const MyLogoutButton = forwardRef<HTMLAnchorElement, MenuItemProps>((props, ref) => {
    const cookies = new Cookies();
    function handleClick() {
        // Logout by removing the token from cookies
        cookies.remove('admin', { path: '/' });
        window.location.href = '/admin';
    }
    return (
        <MenuItem component="a" onClick={handleClick} ref={ref} {...props}>
            <ExitIcon /> Logout
        </MenuItem>
    );
});

MyLogoutButton.displayName = 'MyLogoutButton';

const MyUserMenu = () => (
    <UserMenu>
        <MyLogoutButton />
    </UserMenu>
);

const MyAppBar = () => <AppBar userMenu={<MyUserMenu />} />;

// Custom Sidebar that does not render anything
const MySidebar = () => null;

// Updated MyLayout to use the custom sidebar
const MyLayout = (props: object) => (
    <Layout {...props} appBar={MyAppBar} sidebar={MySidebar} />
);

export default MyLayout;
