import { Avatar, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import useStyles from "./styles";
import Input from "./Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionsTypes";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignUp) dispatch(signup(formData, navigate));
    else dispatch(signin(formData, navigate));
  };

  const googleSuccess = (res) => {
    const credential = jwtDecode(res?.credential);
    console.log(credential);
    try {
      dispatch({ type: AUTH, data: { result: credential, token: res?.credential } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google sign in was unsuccessful. Try again later!");
  };

  return (
    <Container component={"main"} maxWidth={"xs"}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography style={{ marginBottom: "16px" }} variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid className={classes.formGrid} container spacing={2}>
            {isSignUp && (
              <>
                <Input name={"firstName"} label={"First name"} handleChange={handleChange} autoFocus half />
                <Input name={"lastName"} label={"Last name"} handleChange={handleChange} half />
              </>
            )}
            <Input name={"email"} label={"Email Address"} handleChange={handleChange} />
            <Input name={"password"} label={"Password"} handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={() => setShowPassword((prev) => !prev)} />
            {isSignUp && <Input name={"confirmPassword"} label={"Repeat Password"} handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={() => setShowPassword((prev) => !prev)} />}
          </Grid>
          <Button className={classes.button} type="submit" fullWidth variant="contained" color="primary">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          {!isSignUp && <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />}
          <Grid container style={{ marginTop: "16px" }} justifyContent={"flex-end"}>
            <Grid item>
              <Button style={{ color: "black" }} onClick={() => setIsSignUp((prev) => !prev)}>
                {isSignUp ? "Already have an account? Sign in!" : "Don't have an account? Sign up!"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
