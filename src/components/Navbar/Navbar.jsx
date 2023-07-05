import { AppBar, Toolbar, } from '@mui/material';

import MobileNav from './Navbar SubComponents/Mobile/Mobile Nav';
import PCNav from './Navbar SubComponents/PC/PC Nav';
import NavSettings from './Navbar SubComponents/Generic/NavBar Functions';

function ResponsiveAppBar() {

    return (
        <AppBar className='page-header' position="static" sx={{ width:'100%'}}>
                <Toolbar disableGutters sx={{mx: 5}} >
                    <MobileNav />
                    <PCNav />
                    <NavSettings />
                </Toolbar>
        </AppBar> 
    );
};

export default ResponsiveAppBar;