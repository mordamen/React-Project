import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../routes/ROUTES";

import { Box, Button, Typography, } from "@mui/material";

const PCSiteBranding = () => {
    
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(ROUTES.HOME);
    }

    return (
        <Button aria-label="logo" onClick={handleLogoClick} sx={{display: { xs: 'none', md: 'flex' }, m:'auto'}} > 
            <Box
                component="img"
                sx={{
                height: 25,
                width: 25,
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
                display: { xs: 'none', md: 'flex'},
                m: 'auto',
                }}
                alt="brand logo"
                src="https://i.imgur.com/ypjLC25.png"
            />
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mx: 1,
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'text.primary',
                textDecoration: 'none',
                }}
            >
                Card Match
            </Typography>
        </Button>
    );
};

export default PCSiteBranding;