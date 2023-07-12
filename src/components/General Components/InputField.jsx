import { Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

const InputField = ({ inputState, helperText, cols, onChange, showErrors, ...props }) => {
    const [touched, setTouched] = useState(false);
    const handleInputChange = (event) => {
        setTouched(true);
        onChange(event);
    };

    return (
        <Grid item xs={cols}>
        <TextField
            variant='outlined'
            error={(touched || showErrors) && !!helperText}
            helperText={helperText || ' '}
            fullWidth
            value={inputState}
            onChange={handleInputChange}
            {...props}
        />
        </Grid>
    );
};

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    cols: PropTypes.number,
    helperText: PropTypes.string,
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
    showErrors: PropTypes.bool,
};

InputField.defaultProps = {
    cols: 6,
    showErrors: false,
};

export default InputField;