import {useSelector}  from 'react-redux';
import {useState} from 'react';

import {
    Box,
} from '@mui/material';

import ROUTES from '../../../../routes/ROUTES';
import NavLinkComponent from '../Generic/NavLink';

// access to all
const pages = [
    {
        label: "About Us",
        url: ROUTES.ABOUT
    }
];

//Biz pages
const bizPages = [
    {
        label: "My Cards",
        url: ROUTES.MYCARDS
    }
];

const adminPages = [
    {label: "Sandbox", url: ROUTES.SANDBOX}
]

const loggedInPages  = [{label: "Favorite Cards", url: ROUTES.MYFAVS}];

const PageLinks = ({smallScreen, mediumScreen}) => {
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);
    const isLoggedIn = useSelector(
        (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
    );

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box sx={{ flexGrow: 1, display: { xs: smallScreen, md: mediumScreen } }}>
                {pages.map((page) => (
                    <NavLinkComponent key={page.url} isMenuOrLink="false" handleCloseMenu={handleCloseNavMenu} {...page} />
                ))}
                {payload && payload.biz ? bizPages.map((page) => (
                    <NavLinkComponent key={page.url} isMenuOrLink="false" handleCloseMenu={handleCloseNavMenu} {...page} />
                )) : ""}
                {isLoggedIn ? loggedInPages.map((page) => (
                    <NavLinkComponent key={page.url} isMenuOrLink="false" handleCloseMenu={handleCloseNavMenu} {...page} />
                )) : ""}
                {payload && payload.isAdmin ? adminPages.map((page) => (
                    <NavLinkComponent key={page.url} isMenuOrLink="false" handleCloseMenu={handleCloseNavMenu} {...page} />
                )) : ""}
                
        </Box>
    );
};

export default PageLinks;