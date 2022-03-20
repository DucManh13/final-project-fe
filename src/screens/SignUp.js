import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Mail from "@mui/icons-material/Mail";
import Home from "@mui/icons-material/Home";
import Business from "@mui/icons-material/Business";
import Web from "@mui/icons-material/Web";
import Phone from "@mui/icons-material/Phone";
import AccountBox from "@mui/icons-material/AccountBox";
import Event from "@mui/icons-material/Event";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import { REQUEST_SIGNUP_URL } from "../config";
import { postInfo } from "../services/AxiosServices";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../config";
import ImageFadeIn from "react-image-fade-in";

function validateEmail(email) {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
}

function SignUp() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    email: "",
    address: "",
    website: "",
    phone: "",
    role: 1,
  });
  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });

  useEffect(() => {}, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAlert({ ...alert, message: "" });
  };
  const handleChangeRole = (event) => {
    const value = event.target.value === "1" ? 1 : 0;
    setState((prevState) => ({
      username: "",
      password: "",
      name: "",
      age: "",
      email: "",
      address: "",
      website: "",
      phone: "",
      role: value,
    }));
    setAlert({ ...alert, message: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      (state.role === 1 &&
        (state.username === "" ||
          state.password === "" ||
          state.name === "" ||
          state.age === "" ||
          state.email === "" ||
          state.address === "")) ||
      (state.role === 0 &&
        (state.username === "" ||
          state.password === "" ||
          state.name === "" ||
          state.website === "" ||
          state.phone === "" ||
          state.email === "" ||
          state.address === ""))
    ) {
      setAlert({
        severity: "error",
        message: "Please enter all required information!",
      });
    } else if (state.role === 1 && state.age <= 0) {
      setAlert({
        severity: "error",
        message: "Invalid age input",
      });
    } else if (!validateEmail(state.email)) {
      setAlert({
        severity: "error",
        message: "Invalid email format",
      });
    } else {
      setAlert({ severity: "info", message: "Verifying...Please wait" });
      postInfo(
        REQUEST_SIGNUP_URL,
        state,
        (response) => {
          setAlert({ severity: "success", message: response.data });
          setTimeout(() => {
            navigate(LOGIN_URL, {
              state: { username: state.username, password: state.password },
            });
          }, 2000);
        },
        (error) => {
          console.log(error.response);
          if (error.response.status === 400) {
            setAlert({
              severity: "error",
              message: error.response.data,
            });
          }
        }
      );
    }
  };

  return (
    <Grid container sx={{ height: "92vh" }}>
      <Grid item xs={false} sm={4} md={8}>
        <ImageFadeIn width={"100%"} height={"100%"} src={"img_welcome.jpg"} />
      </Grid>
      <Grid item xs={12} sm={8} md={4} sx={{ px: 8, pt: 6, bgcolor: "white" }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" align="center">
            <Box fontWeight="fontWeightBold">SIGN UP</Box>
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="role"
              value={state.role}
              onChange={handleChangeRole}
            >
              <FormControlLabel
                value={1}
                control={<Radio color="success" />}
                label="As Applicant"
              />
              <FormControlLabel
                value={0}
                control={<Radio color="success" />}
                label="As Company"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="username"
            value={state.username}
            onChange={handleChange}
            size="small"
            placeholder="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          {alert.message && alert.param === "username" ? (
            <Typography variant="body2" component="div" color="error">
              {alert.message}
            </Typography>
          ) : null}
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            size="small"
            placeholder="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          {alert.message && alert.param === "password" ? (
            <Typography variant="body2" component="div" color="error">
              {alert.message}
            </Typography>
          ) : null}
          <Divider sx={{ my: 2 }} />

          {state.role === 1 ? (
            <>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="name"
                value={state.name}
                onChange={handleChange}
                size="small"
                placeholder="Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBox />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="age"
                type="number"
                value={state.age}
                onChange={handleChange}
                size="small"
                placeholder="Age"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Event />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          ) : (
            <>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="name"
                value={state.name}
                onChange={handleChange}
                size="small"
                placeholder="Company name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="website"
                value={state.website}
                onChange={handleChange}
                size="small"
                placeholder="Website"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Web />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="phone"
                value={state.phone}
                onChange={handleChange}
                size="small"
                placeholder="Phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="email"
            value={state.email}
            onChange={handleChange}
            size="small"
            placeholder="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="address"
            value={state.address}
            onChange={handleChange}
            size="small"
            placeholder="Address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home />
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
            sx={{ px: 5, mt: 2 }}
          >
            SIGN UP
          </Button>
        </form>
        {alert.message && !alert.param ? (
          <Alert severity={alert.severity} sx={{ mt: 2 }}>
            {alert.message}
          </Alert>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default SignUp;
