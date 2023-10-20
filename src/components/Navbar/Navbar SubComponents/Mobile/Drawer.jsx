import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Avatar, SwipeableDrawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import DrawerContent from './Drawer Content';

const drawerWidth = 240;

const ResponsiveDrawer = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    const [avatarURL,setAvatarURL] = useState(defaultAvatar);
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

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
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, }}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: 'none' } }}
            >
                <Avatar src={avatarURL} />
            </IconButton>
            <Box
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="navlinks"
            >
                <SwipeableDrawer
                    anchor='right'
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    onOpen={handleDrawerToggle}
                    ModalProps={{ keepMounted: true, /* Better open performance on mobile.*/}}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <DrawerContent />
                </SwipeableDrawer>
            </Box>
        </Box>
    );
}

export default ResponsiveDrawer;