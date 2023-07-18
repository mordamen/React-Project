import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ROUTES from "../../../routes/ROUTES";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
}));

const SearchPartial = () => {
    const [searchInput, setSearchInput] = useState("");
    const [firstInitPassedState, setFirstInitPassedState] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setFirstInitPassedState(true);
    }, []);
    useEffect(() => {
        if(firstInitPassedState){
        searchLogic();
        }
    },[searchInput]);

    const searchLogic = () => {
        const currLoc = window.location.href;
        if(currLoc.includes("my_cards")){
        navigate(`${ROUTES.MYCARDS}?filter=${searchInput}`);
        }
        else if(currLoc.includes("my_favs")){
        navigate(`${ROUTES.MYFAVS}?filter=${searchInput}`);
        }
        else{
        navigate(`${ROUTES.HOME}?filter=${searchInput}`);
        }
    }

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    }

    return (
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleSearchChange}
                    value={searchInput}
                />
            </Search>
    );
};
export default SearchPartial;