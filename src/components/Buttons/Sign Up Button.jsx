import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const SignUpButton = ({ handleRegisterClick, label }) => {
	const registerButtonClick = (event) => {
		handleRegisterClick(event);
	};

	return (
		<Button fullWidth variant='contained' sx={{ my: 1 }} onClick={registerButtonClick}>
			<Typography variant='body1' color='initial'>
				{label}
			</Typography>
		</Button>
	);
};

SignUpButton.propTypes = {
	handleRegisterClick: PropTypes.func.isRequired,
};

export default SignUpButton;
