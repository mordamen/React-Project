import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import ROUTES from "../routes/ROUTES";
import validateLoginSchema from "../validation/loginValidation";
import useLoggedIn from "../hooks/useLoggedIn";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginPage = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();

  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateLoginSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      const { data } = await axios.post("/users/login", inputState);
      localStorage.setItem("token", data.token);
      loggedIn();
      //move to homepage
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("login error", err);
    }
  };

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  return (
      <Container className='login-page' maxWidth='false' sx={{display: 'flex', m: 'auto',}} >
          <Paper variant="elevation12" sx={{ opacity: 0.6, m: 'auto' }}>
            <Box sx={{ 
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              flexDirection:'column',
              p: 3}}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={inputState.email}
                      onChange={handleInputChange}
                    />
                    {inputsErrorsState && inputsErrorsState.email && (
                      <Alert severity="warning">
                        {inputsErrorsState.email.map((item) => (
                          <div key={"email-errors" + item}>{item}</div>
                        ))}
                      </Alert>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={inputState.password}
                      onChange={handleInputChange}
                    />
                    {inputsErrorsState && inputsErrorsState.password && (
                      <Alert severity="warning">
                        {inputsErrorsState.password.map((item) => (
                          <div key={"password-errors" + item}>{item}</div>
                        ))}
                      </Alert>
                    )}
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleBtnClick}
                >
                  Sign In
                </Button>
                <Container container sx={{justifyContent: "flex-end"}}>
                    <Link to={ROUTES.REGISTER}>
                      <Typography variant="body2">
                        Did not have an account? Sign up
                      </Typography>
                    </Link>
                </Container>
              </Box>
            </Box>
          </Paper>
      </Container>
    
  );
};

export default LoginPage;
