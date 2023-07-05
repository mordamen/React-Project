import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { Avatar, Box, IconButton, Menu, Tooltip, } from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

import ROUTES from '../../../../routes/ROUTES';
import { authActions } from '../../../../store/auth';
import NavLinkComponent from './NavLink';
import { toast } from 'react-toastify';

//not logged in users
const notLoggedInPages = [
    {
        label: "Register",
        url: ROUTES.REGISTER,
    },
    {
        label: "Login",
        url: ROUTES.LOGIN,
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

const AvatarMenu = () => {
    const dispatch = useDispatch();

    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    const [avatarURL,setAvatarURL] = useState(defaultAvatar);
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const isLoggedIn = useSelector(
        (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
    );

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutClick = () => {
        // Dispatch an action to log out the user
        dispatch(authActions.logout());
        localStorage.clear();
        toast.success("Goodbye! see you later");
    };

    useEffect(() => {
        (async () => {
        try{
            if(payload){
            const {data} = await axios.get("/users/userInfo");
            setAvatarURL(data.imageUrl);
            }
            else{
            setAvatarURL(defaultAvatar);
            }
        }
        catch(err){}
    })();
        
    }, [payload]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 0, }}>
            {isLoggedIn ? 
            <Fragment>
                <Tooltip title="Open settings">
                    <IconButton 
                        onClick={handleOpenUserMenu} 
                        sx={{ p: 0 }}
                    >
                        <Avatar src={avatarURL} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ display: 'flex', flexDirection: 'column', mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {LoggedInPages.map((page) =>
                        page.url === ROUTES.HOME ? (
                        <NavLinkComponent key={page.url} isMenuOrLink="true" handleCloseMenu={handleCloseUserMenu} {...page} onClick={logoutClick} />
                        ) : <NavLinkComponent key={page.url} isMenuOrLink="true" handleCloseMenu={handleCloseUserMenu} {...page} />)}
                    
                </Menu>
            </Fragment> :
                notLoggedInPages.map((page) => 
                <NavLinkComponent key={page.url} {...page}/>)}
        </Box>
    );
};

export default AvatarMenu;