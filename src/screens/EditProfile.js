import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState, useEffect, useContext } from "react";
import { postInfo, putInfo } from "../services/AxiosServices";
import { AuthContext } from "../contexts/AuthContext";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import LoadingLayer from "../components/LoadingLayer";
import { toast } from "react-toastify";

function validateEmail (email) {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
}

function EditProfile() {
  const [state, setState] = useState();
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    if (loggedInUser) {
      postInfo(
        "/account",
        loggedInUser,
        (response) => {
          if (mounted) {
            setState(response.data);
            setIsLoading(false);
          }
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }
    return () => {
      mounted = false;
    };
  }, [loggedInUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAlert({ ...alert, message: "" });
  };

  const handleReset = () => {
    setState({ ...state, name: "", age: "", email: "", address: "" });
    setAlert({ ...alert, message: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      state.name === "" ||
      state.age === "" ||
      state.email === "" ||
      state.address === ""
    ) {
      setAlert({
        severity: "error",
        message: "Please enter all required information!",
      });
    } else if (state.age<=0) {
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
      setIsLoading(true);
      putInfo(
        "/account/applicant",
        state,
        (response) => {
          setIsLoading(false);
          toast.success(response.data);
          navigate("/profile");
        },
        (error) => {
          setIsLoading(false);
          console.log(error.response);
        }
      );
    }
  };

  return (
    <Container maxWidth="lg">
      {state && (
        <Paper
          variant="outlined"
          sx={{
            mx: 10,
            mt: { xs: 3, md: 4 },
            p: { xs: 2, md: 3 },
            minHeight: "40vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: 1,
            }}
          >
            <Typography
              variant="h4"
              color="success.main"
              fontWeight={"bold"}
              flexGrow={1}
            >
              Edit Profile
            </Typography>
          </Box>
          <Divider />
          <Grid container spacing={1} sx={{ mt: 2, pl: 5 }} alignItems="center">
            <Grid item xs={2}>
              <Typography variant="h6" fontWeight={"bold"}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="name"
                value={state.name}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={2}>
              <Typography variant="h6" fontWeight={"bold"}>
                Age
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="age"
                type="number"
                value={state.age}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={2}>
              <Typography variant="h6" fontWeight={"bold"}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="email"
                value={state.email}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={2}>
              <Typography variant="h6" fontWeight={"bold"}>
                Address
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="address"
                value={state.address}
                onChange={handleChange}
                size="small"
              />
            </Grid>
          </Grid>
          {alert.message && !alert.param ? (
            <Alert severity={alert.severity} sx={{ mt: 2 }}>
              {alert.message}
            </Alert>
          ) : null}
          <Grid container item xs={12} justifyContent="center" sx={{ mt: 5 }}>
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                color="success"
                size="large"
                disableElevation
                onClick={handleReset}
              >
                RESET
              </Button>
              <Button
                variant="contained"
                color="success"
                size="large"
                disableElevation
                onClick={handleSubmit}
              >
                SUBMIT
              </Button>
            </Stack>
          </Grid>
        </Paper>
      )}
      <LoadingLayer open={isLoading} />
    </Container>
  );
}

export default EditProfile;
