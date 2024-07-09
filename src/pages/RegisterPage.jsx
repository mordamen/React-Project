import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import ROUTES from '../routes/ROUTES';
import initialUserInputState from '../utilities/initialUserInputState';
import validateRegisterFieldFromSchema, { validateRegisterSchema } from '../validation/registerValidation';
import TextBlocks from '../components/General Components/Text Blocks';
import FieldButtons from '../components/Buttons/Field Buttons';

import { FormControlLabel, Checkbox, Grid, Box, Typography, Container, Paper } from '@mui/material';

import initializeUserFields from '../utilities/initializeUserFields';

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
		console.log('Current inputState is: ', inputState);
		console.log('Current errorState is: ', errorState);
	});

	// Function to validate the repeat_password field
	const validateRepeatPassword = (password, repeatPassword) => {
		if (password !== repeatPassword) {
			return 'Passwords do not match';
		}
		return '';
	};

	// The following code handles changes in the DOM and syncronizes the VirtualDOM with the real DOM. This is done by creating an identical copy of the original state and then changing the specific value for the field that has been changed (target.id):

	const handleInputChange = (event) => {
		const { id, value } = event.target;

		setInputState((prevInputState) => ({
			...prevInputState,
			[id]: value,
		}));

		if (id === 'repeat_password') {
			const repeatPasswordValidationResult = validateRepeatPassword(inputState.password, value);

			setErrorState((prevErrorState) => ({
				...prevErrorState,
				repeat_password: repeatPasswordValidationResult,
			}));
		} else {
			const fieldValidationResult = validateRegisterFieldFromSchema(value, id);

			setErrorState((prevErrorState) => ({
				...prevErrorState,
				[id]: fieldValidationResult[id],
			}));
		}
	};

	// This function handles the changes whenever the user clicks on the register button
	const handleRegisterClick = async (event) => {
		try {
			setShowErrors(true);
			const errors = validateRegisterSchema(inputState);

			console.log('Validation Error: ', errors);
			setErrorState(errors);
			if (errors) return;
			delete inputState.repeat_password;
			await axios.post('/users/register', inputState);
			navigate(ROUTES.LOGIN);
			toast.success(`Welcome ${inputState.firstName} to Card Match!`);
		} catch (error) {
			console.log('error from axios', error.response.data);
			toast.error('Error trying to regsiter user');
		}
	};

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
		<Container maxWidth='false' className='register-page' sx={{ display: 'flex', m: 'auto' }}>
			<Paper variant='elevation12' sx={{ opacity: 0.6, m: 'auto' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						p: 1.5,
						m: 'auto',
						maxWidth: 'md',
					}}
				>
					<Typography component='h1' variant='h5'>
						Sign in
					</Typography>
					<Box component='form' noValidate sx={{ mt: 1 }}>
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
									id='biz'
									checked={inputState.biz}
									onChange={handleCheckboxChange}
									color='primary'
								/>
							}
							label='I would like to sign up as a Business Account'
						/>
						<FieldButtons
							onRefreshClick={handleRefreshClick}
							onSubmitClick={handleRegisterClick}
							label='Sign Up'
						/>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link to={ROUTES.LOGIN}>
									<Typography variant='body2'>Already have an account? Sign in</Typography>
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
