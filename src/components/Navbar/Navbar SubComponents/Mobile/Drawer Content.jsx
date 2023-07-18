import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Fragment } from "react";


import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import SearchPartial from '../../Search Bar/SearchPartial'
import ROUTES from "../../../../routes/ROUTES";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../../store/auth";
import { toast } from "react-toastify";
import ThemeSelector from "../Generic/Theme Selector";

//not logged in users
const notLoggedInPages = [
    {
        label: 'Register',
        url: ROUTES.REGISTER,
        icon: <AppRegistrationIcon />
    },
    {
        label: 'Login',
        url: ROUTES.LOGIN,
        icon: <LoginIcon />
    },
];

//logged in users
const LoggedInPages = [
    {
        label: 'Profile',
        url: ROUTES.PROFILE,
        icon: <PersonIcon />,
    },
    {
        label: 'Logout',
        url: ROUTES.HOME,
        icon: <LogoutIcon />,
    },
];

const DrawerContent = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(
        (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
    );
    
    const logoutClick = () => {
        // Dispatch an action to log out the user
        dispatch(authActions.logout());
        localStorage.clear();
        toast.success("Goodbye! see you later");
    };

    return (
        <Fragment>
            <Toolbar />
            <Divider />
            <List>
                {(isLoggedIn ? LoggedInPages : notLoggedInPages).map((page) => (
                    <ListItem key={page.url} disablePadding>
                    <NavLink to={page.url}>
                        {({ isActive }) => (
                        <ListItemButton onClick={page.label === 'Logout' ? logoutClick : undefined}>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText 
                            primary={page.label}
                            primaryTypographyProps={{
                                color: isActive ? 'warning.main' : 'text.primary',
                            }}  />
                        </ListItemButton>
                        )}
                    </NavLink>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <ThemeSelector />
            <SearchPartial />
        </Fragment>
    )
}

export default DrawerContent;