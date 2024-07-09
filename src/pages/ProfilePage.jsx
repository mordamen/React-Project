import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ROUTES from '../routes/ROUTES';
import useLoggedIn from '../hooks/useLoggedIn';
import TextBlocks from '../components/General Components/Text Blocks';
import initializeUserFields from '../utilities/initializeUserFields';
import initialUserInputState from '../utilities/initialUserInputState';
import validateRegisterFieldFromSchema, { validateRegisterSchema } from '../validation/registerValidation';
import FieldButtons from '../components/Buttons/Field Buttons';

const ProfilePage = () => {
	const [inputState, setInputState] = useState(initialUserInputState);
	const [errorState, setErrorState] = useState({});
	const [showErrors, setShowErrors] = useState(false);

	const navigate = useNavigate();
	const loggedIn = useLoggedIn();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const { data } = await axios.get('/users/userInfo');
				setInputState(data);
			} catch (err) {
				console.error(err);
				toast.error('Failed to load Profile data');
			}
		};

		fetchUserData();
	}, []);

	const handleInputChange = (event) => {
		const { id, value } = event.target;

		setInputState((prevState) => ({
			...prevState,
			[id]: value,
		}));

		const fieldValidationResult = validateRegisterFieldFromSchema(value, id);

		setErrorState((prevState) => ({
			...prevState,
			[id]: fieldValidationResult[id],
		}));
	};

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		const joiResponse = validateRegisterSchema(inputState);

		if (joiResponse) {
			setErrorState(joiResponse);
			setShowErrors(true);
			return;
		}

		try {
			const { data } = await axios.put('users/userInfo', inputState);
			localStorage.setItem('token', data.token);
			loggedIn();
			navigate(ROUTES.HOME);
		} catch (err) {
			if (err.response?.status === 500) {
				toast.error('Error when updating profile, Cannot update profile due to email already being taken');
			} else {
				toast.error('An error occurred');
			}
		}
	};

	const handleRefreshClick = () => {
		setInputState(initialUserInputState);
		setErrorState({});
		setShowErrors(false);
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
