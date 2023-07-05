import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import CreateCard from "../Business Cards/Modals/Create Card";

import {
    Fab,
    Tooltip,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

function AddCardButton() {
    //The following code sets the state and the functions for opening or closing the modal:
    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    // This const handles checking if the user is logged in or not and what type of user are they
    const payload = useSelector((bigPie) => bigPie.authSlice.payload);

    return (
        <Fragment>
            {payload && (payload.isAdmin || payload.biz) && (
                <Tooltip className='createCardButton' title="Create a New Card">
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={handleClickOpen}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            )}
            <CreateCard
                open={open}
                onClick={handleClose}
            />
        </Fragment>
    );
}

export default AddCardButton;