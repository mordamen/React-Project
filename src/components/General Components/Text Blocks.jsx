import { Grid } from "@mui/material"
import InputField from "./InputField"

const TextBlocks = ({initializeTextFields, inputState, errorState, showErrors, handleInputChange, }) => {

    return (
        <Grid container spacing={2}>
            {initializeTextFields && Object.keys(initializeTextFields).map((key) => (
                <InputField
                    key={key + "inputs"}
                    label={initializeTextFields[key].label}
                    type={initializeTextFields[key].type}
                    id={key}
                    cols={initializeTextFields[key].sm}
                    required={initializeTextFields[key].required}
                    size='small'
                    helperText={errorState && errorState[key] && errorState[key].join(", ")}
                    value={inputState[key]}
                    onChange={handleInputChange}
                    showErrors={showErrors}
                />
            ))}
        </Grid>
    )
}

export default TextBlocks;