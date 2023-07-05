import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ROUTES from '../../routes/ROUTES';

import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
} from "@mui/material";

import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AttributionIcon from "@mui/icons-material/Attribution";

const BottomNavigationBar = () => {

    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    const handleToAboutClick = () => {
    navigate(ROUTES.ABOUT);
    };
    const handleToFavsClick = () => {
    navigate(ROUTES.MYFAVS);
    };
    const handleToMyCardsClick = () => {
    navigate(ROUTES.MYCARDS);
    };

    return (

    <Box className='page-footer' component="footer">
        <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        sx={{ opacity: 0.8 }}
        >
        <BottomNavigationAction
            label="About"
            icon={<InfoIcon />}
            onClick={handleToAboutClick}
        />
        {payload && !payload.isAdmin && !payload.biz && (
            <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            onClick={handleToFavsClick}
            />
        )}
        {payload && (payload.isAdmin || payload.biz) && (
            <BottomNavigationAction
            label="My Cards"
            icon={<AttributionIcon />}
            onClick={handleToMyCardsClick}
            />
        )}
        </BottomNavigation>
    </Box>
        
    );
};

export default BottomNavigationBar;