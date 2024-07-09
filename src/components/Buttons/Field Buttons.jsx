import { Fragment } from 'react';
import CancelButtonComponent from './Cancel Buttont';
import RefreshButtonComponent from './Refresh Button';
import SignUpButton from './Sign Up Button';
import { Grid } from '@mui/material';

const FieldButtons = ({ onRefreshClick, onSubmitClick, label }) => {
	const handleRefreshClick = (event) => {
		onRefreshClick(event);
	};

	const handleButtonClick = (event) => {
		onSubmitClick(event);
	};

	return (
		<Fragment>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<CancelButtonComponent />
				</Grid>
				{/* ----------------------------- REFRESH BUTTON -------------------------------- */}
				<Grid item xs={6}>
					<RefreshButtonComponent handleRefreshClick={handleRefreshClick} />
				</Grid>
			</Grid>
			<SignUpButton handleRegisterClick={handleButtonClick} label={label} />
		</Fragment>
	);
};

export default FieldButtons;
