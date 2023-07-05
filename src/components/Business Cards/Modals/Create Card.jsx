import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

import validateCardFieldFromSchema, { validateCardSchema } from "../../../validation/cardValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { initialCardFields } from "../../../utilities/initializeCardFields";
import initialCardInputState from "../../../utilities/initialCardInputState";
import TextBlocks from "../../General Components/Text Blocks";
import ROUTES from "../../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

function CreateCard({open, onClick}) {
    
    const navigate = useNavigate();

    const navLogic = () => {
        const currentLocation = window.location.href;
        if(currentLocation.includes("my_cards")){
            navigate(`${ROUTES.MYCARDS}`);
        }
        else if(currentLocation.includes("my_favs")){
            navigate(`${ROUTES.MYFAVS}`);
        }
        else{
            navigate(`${ROUTES.HOME}`);
        }
    }
    
    const initialErrorState = {};
    // This function sets the expected input states for each input field:
    const [inputState, setInputState] = useState(initialCardInputState);
    // This function sets the expected input states for each error field each time the user changes a specific input textfield:
    const [errorState, setErrorState] = useState(initialErrorState);
    // This function sets the expected input states for each error field when the Register button is clicked:
    const [showErrors, setShowErrors] = useState(false);

    // The following code handles changes in the DOM and syncronizes the VirtualDOM with the real DOM. This is done by creating an identical copy of the original state and then changing the specific value for the field that has been changed (target.id):
    const handleInputChange = (event) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[event.target.id] = event.target.value;
        setInputState(newInputState);
        let fieldValidationResult = validateCardFieldFromSchema(event.target.value, event.target.id);
        let newErrorState = JSON.parse(JSON.stringify(errorState));
        newErrorState[event.target.id] = fieldValidationResult[event.target.id];
        setErrorState(newErrorState);
    }

    function handleCreateCardClick() {
        (async () => {
            try {
                setShowErrors(true);
                const errors = validateCardSchema(inputState);
                setErrorState(errors);
                console.log('errors are: ', errors);

                if (!errors) {
                    await axios.post("/cards/", inputState);
                    toast.success("Succeeded to save new card");
                    handleClose();
                    navLogic();
                }
            }
            catch (error) {
                toast.error("Failed to save new card");
            }
        })();
    }

    const handleClose = (event) => {
        setInputState(initialCardInputState);
        setErrorState(initialErrorState);
        onClick(event)
    }

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>Create a New Card</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{mb:1}}>
                    Please fill in the following info to create a new business card!
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreateCardClick}>Add Card</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateCard;