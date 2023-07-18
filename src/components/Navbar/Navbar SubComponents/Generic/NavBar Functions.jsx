import { useDispatch, useSelector } from 'react-redux';

import { Box, IconButton, Tooltip } from "@mui/material";
import AvatarMenu from "./Avatar Menu";
import SearchPartial from "../../Search Bar/SearchPartial";
import { darkThemeActions } from '../../../../store/darkTheme';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const NavSettings = () => {

    const dispatch = useDispatch();

    const isDarkTheme = useSelector(
        (bigPie) => bigPie.darkThemeSlice.isDarkTheme
    );

    const changeTheme = () => {
        dispatch(darkThemeActions.changeTheme());
    };

    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', flexGrow: 0,}}>
            <SearchPartial />
            <Tooltip title="Change Color Theme">
                <IconButton onClick={changeTheme} sx={{m: 'auto', display: { xs: 'none', md: 'flex' }}}>
                    {isDarkTheme  ? 
                    <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Tooltip>
            <AvatarMenu/>
        </Box>
    )
};

export default NavSettings;