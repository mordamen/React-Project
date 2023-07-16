import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Tooltip } from "@mui/material";
import { darkThemeActions } from '../../../../store/darkTheme';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeSelector = () => {

    const dispatch = useDispatch();

    const isDarkTheme = useSelector(
        (bigPie) => bigPie.darkThemeSlice.isDarkTheme
    );

    const changeTheme = () => {
        dispatch(darkThemeActions.changeTheme());
    };

    return (
        <Tooltip title="Change Color Theme">
            <IconButton onClick={changeTheme} sx={{m: 'auto', display: { xs: 'none', md: 'flex' }}}>
                {isDarkTheme  ? 
                <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </Tooltip>
    )
};

export default ThemeSelector;