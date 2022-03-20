import { useState, useEffect, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import { Link as RouterLink } from "react-router-dom";
import { HOME_URL, REQUEST_LOGIN_URL, SIGNUP_URL } from "../config";
import { postInfo } from "../services/AxiosServices";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ImageFadeIn from "react-image-fade-in";
function Login() {
  const navigate = useNavigate();
  const loginInfo = useLocation().state;
  const { setLoggedInUser } = useContext(AuthContext);

  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });

  useEffect(() => {
    if (loginInfo) setState(loginInfo);
  }, [loginInfo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAlert({ ...alert, message: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.username === "" || state.password === "") {
      setAlert({
        severity: "error",
        message: "Please enter your username and password!",
      });
    } else {
      setAlert({ severity: "info", message: "Verifying...Please wait" });
      postInfo(
        REQUEST_LOGIN_URL,
        state,
        (response) => {
          const token = response.data;
          setAlert({ severity: "success", message: "Login successfully!" });
          localStorage.setItem("token", JSON.stringify(token));
          setLoggedInUser(token);
          navigate(`${HOME_URL}`);
        },
        (error) => {
          setAlert({
            severity: "error",
            message: error.response.data,
          });
        }
      );
    }
  };

  return (
    <Grid container sx={{ height: "92vh" }}>
      <Grid item xs={false} sm={4} md={8}>
        <ImageFadeIn width={"100%"} height={"100%"} src={"img_welcome.jpg"} />
      </Grid>
      <Grid item xs={12} sm={8} md={4} sx={{ px: 5, pt: 15, bgcolor: "white" }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" align="center">
            <Box fontWeight="fontWeightBold">LOGIN</Box>
          </Typography>
          <Typography variant="subtitle1">Username</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="username"
            value={state.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="subtitle1">Password</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disableElevation
            color="success"
            sx={{ px: 5, my: 2 }}
          >
            LOGIN
          </Button>
          <Link component={RouterLink} to={SIGNUP_URL} color="textPrimary">
            <Typography variant="body2" align="center">
              Not have an account?
              <strong>{" Sign Up"}</strong>
            </Typography>
          </Link>
        </Box>
        {alert.message ? (
          <Alert severity={alert.severity} sx={{ my: 2 }}>
            {alert.message}
          </Alert>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default Login;
