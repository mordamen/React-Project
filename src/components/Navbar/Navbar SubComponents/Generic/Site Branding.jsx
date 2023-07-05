import { useNavigate } from "react-router-dom";
import ROUTES from "../../../../routes/ROUTES";

import {
    Button,
    Typography,
    Box
} from "@mui/material";

const SiteBranding = (smallScreen, mediumScreen) => {
    
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(ROUTES.HOME);
    }

    return (
        <Button aria-label="logo" onClick={handleLogoClick} sx={{display: 'flex', m:'auto'}}> 
            <Box
                component="img"
                sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                }}
                alt="brand logo"
                src="https://i.imgur.com/ypjLC25.png"
            />
            <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: 'flex',
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                    textDecoration: 'none',
                }}
            >
                Card Match
            </Typography>
        </Button>
    );
};

export default SiteBranding;