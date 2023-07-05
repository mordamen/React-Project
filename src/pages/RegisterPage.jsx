import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import ROUTES from "../routes/ROUTES";
import initialUserInputState from "../utilities/initialUserInputState";
import validateRegisterFieldFromSchema, { validateRegisterSchema } from "../validation/registerValidation";
import TextBlocks from "../components/General Components/Text Blocks";
import FieldButtons from "../components/Buttons/Field Buttons";

import {
    Avatar,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Container,
    Paper,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import initializeUserFields from "../utilities/initializeUserFields";



const RegisterPage = () => {
    const initialErrorState = {};

    // This function handles the state for each input field:
    const [inputState, setInputState] = useState(initialUserInputState);
    // This function handles the state for each error field:
    const [errorState, setErrorState] = useState(initialErrorState);
    // This function handles the state for each error field when the Register button is clicked:
    const [showErrors, setShowErrors] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Current Values are: ", inputState);
    });

    // The following code handles changes in the DOM and syncronizes the VirtualDOM with the real DOM. This is done by creating an identical copy of the original state and then changing the specific value for the field that has been changed (target.id):
    const handleInputChange = (event) => {
        //This makes a deep copy of the previous state
        let newInputState = JSON.parse(JSON.stringify(inputState));
        // this copies the newstate at the id of the event to the previous state 
        newInputState[event.target.id] = event.target.value;
        // this updates the new state with the updated state
        setInputState(newInputState);
        
        let fieldValidationResult = validateRegisterFieldFromSchema(event.target.value, event.target.id);
        let newErrorState = JSON.parse(JSON.stringify(errorState));
        newErrorState[event.target.id] = fieldValidationResult[event.target.id];
        setErrorState(newErrorState);
    };

    // This function handles the changes whenever the user clicks on the register button
    const handleRegisterClick = async (event) => {
        try {
            setShowErrors(true);
            const errors = validateRegisterSchema(inputState);
            console.log("Validation Error: ", errors);
            setErrorState(errors);
            if (errors)
                return;
            delete inputState.repeat_password;
            await axios.post("/users/register", inputState);
            navigate(ROUTES.LOGIN);
            toast.success(`Welcome ${inputState.firstName} to Card Match!`);
        } catch (error) {
            console.log("error from axios", error.response.data);
            toast.error("Error trying to regsiter user");
        }
    }

    const handleCheckboxChange = (ev) => {
        let newInputState = JSON.parse(JSON.stringify(inputState));
        newInputState[ev.target.id] = ev.target.checked;
        setInputState(newInputState);
    };

    const handleRefreshClick = (ev) => {
        setInputState(initialUserInputState);
        setErrorState(initialErrorState);
    };

    return (

        <Container maxWidth='false' className='register-page' sx={{display: 'flex', m: 'auto',}}>
            <Paper variant="elevation12" sx={{ opacity: 0.6, m: 'auto' }}>
                <Box sx={{ 
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                    p: 3,
                    m: 'auto',
                    maxWidth:'md',}}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component='form' noValidate sx={{ mt: 3 }}>
                        <TextBlocks
                            initializeTextFields={initializeUserFields}
                            inputState={inputState}
                            errorState={errorState}
                            showErrors={showErrors}
                            handleInputChange={handleInputChange}
                        />
                        <FormControlLabel
                            sx={{ mt: 1 }}
                            control={
                                <Checkbox
                                    id="biz"
                                    checked={inputState.biz}
                                    onChange={handleCheckboxChange}
                                    color="primary"
                                />
                            }
                            label="I would like to sign up as a Business Account"
                        />
                        <FieldButtons 
                            onRefreshClick={handleRefreshClick}
                            onSubmitClick={handleRegisterClick}
                        />
                        <Grid container justifyContent="flex-end">
                            <Grid item >
                                <Link to={ROUTES.LOGIN}>
                                    <Typography variant="body2">
                                    Already have an account? Sign in
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};
export default RegisterPage;
