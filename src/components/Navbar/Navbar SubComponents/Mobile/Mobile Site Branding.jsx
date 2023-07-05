import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../routes/ROUTES";

import { Button, Typography, } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';

const MobileSiteBranding = () => {
    
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(ROUTES.HOME);
    }

    return (
        <Button aria-label="logo" onClick={handleLogoClick} sx={{display: { xs: 'flex', md: 'none' }, m:'auto'}}> 
            <AdbIcon sx={{display: { xs: 'flex', md: 'none' }}}/>
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                Card Match
            </Typography>
        </Button>
    );
};

export default MobileSiteBranding;