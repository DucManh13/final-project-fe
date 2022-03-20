import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import firebase from "firebase/compat/app";
import { storage } from "../services/FirebaseServices";
import { useState, useEffect, useContext, useRef } from "react";
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

function EditCompanyProfile() {
  const inputFileRef = useRef(null);
  const [state, setState] = useState();
  const { loggedInUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    setState({
      ...state,
      name: "",
      email: "",
      address: "",
      website: "",
      phone: "",
      description: "",
    });
    setAlert({ ...alert, message: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      state.name === "" ||
      state.email === "" ||
      state.address === "" ||
      state.website === "" ||
      state.phone === "" ||
      state.logo === "" ||
      state.description === ""
    ) {
      setAlert({
        severity: "error",
        message: "Please enter all required information!",
      });
    } else if (!validateEmail(state.email)) {
      setAlert({
        severity: "error",
        message: "Invalid email format",
      });
    } else {
      setIsLoading(true);
      putInfo(
        "/account/company",
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
  
  const uploadFile = (file) => {
    setIsLoading(true);
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = storage.ref(`img/${Date.now()}`).put(file, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setState((prevState) => ({
            ...prevState,
            logo: downloadURL,
          }));
          setIsLoading(false);
        });
      }
    );
  };

  const changeLogo = (event) => {
    uploadFile(event.target.files[0]);
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
              Edit Company Profile
            </Typography>
          </Box>
          <Divider />
          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item container xs={8} alignItems="center">
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Name
                </Typography>
              </Grid>
              <Grid item xs={9}>
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
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Website
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  name="website"
                  value={state.website}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={9}>
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
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={9}>
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
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Phone
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  name="phone"
                  value={state.phone}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  name="description"
                  multiline
                  rows={4}
                  value={state.description}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={4}
              justifyContent="center"
              alignItems="center"
              sx={{ my: 5 }}
            >
              <img
                width="200"
                height="200"
                src={state.logo}
                alt="Company Logo"
              />
              <Button
                type="file"
                color="success"
                variant="outlined"
                onClick={() => inputFileRef.current.click()}
              >
                Change Logo
              </Button>
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
      <input
        type="file"
        ref={inputFileRef}
        onChange={changeLogo}
        accept="image/*"
        style={{ display: "none" }}
      />
    </Container>
  );
}

export default EditCompanyProfile;
