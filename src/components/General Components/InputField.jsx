import { Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const InputField = ({ inputState, helperText, cols, onChange, showErrors, ...props }) => {
  const [touched, setTouched] = useState(false);
  const handleInputChange = (event) => {
    console.log("The field is: ", event.target.id, " and the value is: ", event.target.value);
    setTouched(true);
    onChange(event);
  };
  
  return (
      <Grid item xs={cols}>
        <TextField
          variant="outlined"
          error={(touched || showErrors) && !!helperText}
          helperText={(touched || showErrors) && helperText}
          fullWidth
          value={inputState}
          {...props}
          onChange={handleInputChange}
        />
      </Grid>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  cols: PropTypes.number,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  showErrors: PropTypes.bool,
};
InputField.defaultProps = {
  cols: 6,
  showErrors: false,
};

export default InputField;
