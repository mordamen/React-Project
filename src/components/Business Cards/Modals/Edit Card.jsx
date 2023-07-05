import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from "@mui/material";
import { initialCardFields } from "../../../utilities/initializeCardFields";

import validateCardFieldFromSchema, { validateCardSchema } from "../../../validation/cardValidation";
import { toast } from "react-toastify";
import axios from "axios";
import TextBlocks from "../../General Components/Text Blocks";
import { useState } from "react";


// function EditCard({openEdit, handleClose, inputState, errorState, showErrors, handleEditBtnClick, handleInputChange}) {
function EditCard({openEdit, setOpenEdit, cardData, setCardsArr}) {

    const initialErrorState = {};
    
    // This function sets the expected input states for each input field:
    const [inputState, setInputState] = useState(cardData);
    // This function sets the expected input states for each error field each time the user changes a specific input textfield:
    const [errorState, setErrorState] = useState(initialErrorState);
    // This function sets the expected input states for each error field when the Register button is clicked:
    const [showErrors, setShowErrors] = useState(false);

    // The following code handles changes in the DOM and syncronizes the VirtualDOM with the real DOM. This is done by creating an identical copy of the original state and then changing the specific value for the field that has been changed (target.id):
    function handleInputChange(event) {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[event.target.id] = event.target.value;
        setInputState(newInputState);

        let fieldValidationResult = validateCardFieldFromSchema(event.target.value, event.target.id);
        let newErrorState = JSON.parse(JSON.stringify(errorState));
        newErrorState[event.target.id] = fieldValidationResult[event.target.id];
        setErrorState(newErrorState);
    }

    const handleEditBtnClick = async () => {
        try {
            delete inputState.id;
            const joiResponse = validateCardSchema(inputState);
            setErrorState(joiResponse);
            console.log('errorState is: ', errorState)
            if (!joiResponse) {
            const response = await axios.put("/cards/" + cardData.id, inputState);
            const editedCard = response.data;
            setTimeout(toast.success("Edit Saved Successfully"), 3000);
            setOpenEdit(false);
            
            setCardsArr((prevCardsArr) =>
                prevCardsArr.map((card) => {
                if (card._id === editedCard._id) {
                    return editedCard;
                }
                return card;
                })
            );
            }
        } catch (error) {
            toast.error("Failed to Save Edit");
            console.log('edit error: ', error);
            console.log('Current inputState is: ', inputState);
        }
    };



    const handleCloseEdit = () => {
        setOpenEdit(false);
    }

    return (
        <Dialog open={openEdit} onClose={handleCloseEdit} >
            <DialogTitle>Edit your Card</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{mb:1}}>
                    Please fill in the following info to edit your business card!
                </DialogContentText>
                <TextBlocks 
                    initializeTextFields={initialCardFields}
                    inputState={inputState}
                    errorState={errorState}
                    showErrors={showErrors}
                    handleInputChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEdit}>Cancel</Button>
                <Button onClick={handleEditBtnClick}>Edit Card</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditCard;