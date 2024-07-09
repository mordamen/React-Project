import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ROUTES from '../routes/ROUTES';
import useLoggedIn from '../hooks/useLoggedIn';
import TextBlocks from '../components/General Components/Text Blocks';
import initializeUserFields from '../utilities/initializeUserFields';
import initialUserInputState from '../utilities/initialUserInputState';
import validateRegisterFieldFromSchema, { validateRegisterSchema } from '../validation/registerValidation';
import FieldButtons from '../components/Buttons/Field Buttons';
import { Paper } from '@mui/material';

const ProfilePage = () => {
	const initialErrorState = {};

	// This function handles the state for each input field:
	const [inputState, setInputState] = useState(initialUserInputState);
	// This function handles the state for each error field:
	const [errorState, setErrorState] = useState(initialErrorState);
	// This function handles the state for each error field when the Register button is clicked:
	const [showErrors, setShowErrors] = useState(false);

	const navigate = useNavigate();
	const loggedIn = useLoggedIn();

	useEffect(() => {
		// Fetch user data
		(async () => {
			try {
				const { data } = await axios.get('/users/userInfo');
				setInputState(data);
			} catch (err) {
				console.log(err);
				toast.error('Failed to load Profile data');
			}
		})();
	}, []);

	// const validateForm = () => {
	//     // Validate the form by checking if all required fields have values and no form errors exist
	//     for (const field of registerFieldsArray) {
	//         if (field.name !== 'password' && field.required && (!formData[field.name] || formError[field.name])) {
	//             return false;
	//         }
	//     }
	//     return true;
	// };

	const handleInputChange = (event) => {
		//This makes a deep copy of the previous state
		let newInputState = JSON.parse(JSON.stringify(inputState));
		console.log(event);
		// this copies the newstate at the id of the event to the previous state
		newInputState[event.target.id] = event.target.value;
		// this updates the new state with the updated state
		setInputState(newInputState);

		let fieldValidationResult = validateRegisterFieldFromSchema(event.target.value, event.target.id);
		let newErrorState = JSON.parse(JSON.stringify(errorState));
		newErrorState[event.target.id] = fieldValidationResult[event.target.id];
		setErrorState(newErrorState);
	};

	const handleSubmit = async (ev) => {
		try {
			const joiResponse = validateRegisterSchema(inputState);
			setErrorState(joiResponse);
			if (joiResponse) {
				return;
			}
			let res = await axios.put('users/userInfo', inputState);
			localStorage.setItem('token', res.data.token);
			loggedIn();
			navigate(ROUTES.HOME);
		} catch (err) {
			if (err.response.status === 500) {
				toast.error('Error when updating profile, Cannot update profile due to email already being taken');
			}
		}
	};

	const handleRefreshClick = (ev) => {
		setInputState(initialUserInputState);
		setErrorState(initialErrorState);
	};

	return (
		<Container maxWidth='false' className='profile-page' sx={{ display: 'flex', m: 'auto' }}>
			<Paper variant='elevation12' sx={{ opacity: 0.6, m: 'auto' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						p: 3,
						m: 'auto',
						maxWidth: 'md',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<EditIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Edit your profile
					</Typography>
					<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<TextBlocks
							initializeTextFields={initializeUserFields}
							inputState={inputState}
							errorState={errorState}
							showErrors={showErrors}
							onChange={handleInputChange}
						/>
					</Box>
					<FieldButtons
						onRefreshClick={handleRefreshClick}
						onSubmitClick={handleSubmit}
						label='Update Profile'
					/>
				</Box>
			</Paper>
		</Container>
	);
};

export default ProfilePage;
