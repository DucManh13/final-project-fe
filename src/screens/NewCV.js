import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import firebase from "firebase/compat/app";
import { storage } from "../services/FirebaseServices";
import { useState, useRef, useContext } from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Alert from "@mui/material/Alert";
import { postInfo } from "../services/AxiosServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LoadingLayer from "../components/LoadingLayer";
import { toast } from "react-toastify";

function validateEmail (email) {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
}

function NewCV() {
  const inputFileRef = useRef(null);
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    cvName: "",
    name: "",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/final-project-8d1d3.appspot.com/o/img%2Fdefault_photo.jpg?alt=media&token=dc1528a1-67b5-45bc-a58f-8024e5c9ad0c",
    birthday: new Date(),
    gender: 1,
    email: "",
    phone: "",
    address: "",
    objective: "",
    experience: "",
    skills: "",
  });

  const [alert, setAlert] = useState({
    severity: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAlert({ ...alert, message: "" });
  };
  const handleDateChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      birthday: value,
    }));
  };
  const handleChangeGender = (event) => {
    const value = event.target.value === "1" ? 1 : 0;
    setState((prevState) => ({
      ...prevState,
      gender: value,
    }));
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
            photo: downloadURL,
          }));
          setIsLoading(false);
        });
      }
    );
  };

  const changeAvatar = (event) => {
    uploadFile(event.target.files[0]);
  };

  const handleReset = () => {
    setState({
      ...state,
      name: "",
      cvName: "",
      email: "",
      gender: 1,
      birthday: new Date(),
      phone: "",
      address: "",
      objective: "",
      skills: "",
      experience: "",
    });
    setAlert({ ...alert, message: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      state.cvName === "" ||
      state.name === "" ||
      state.email === "" ||
      state.phone === "" ||
      state.address === "" ||
      state.objective === "" ||
      state.experience === "" ||
      state.skills === ""
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
      postInfo(
        "/cv/new",
        { ...state, accountId: loggedInUser.id },
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
      <Paper
        variant="outlined"
        sx={{
          mx: 10,
          mt: 3,
          py: 2,
          px: 4,
        }}
      >
        <Typography variant="h4" color="success.main" fontWeight={"bold"}>
          Create New CV
        </Typography>
        <Divider />

        <Grid container spacing={1} sx={{ my: 3 }}>
          <Grid container item xs={4} justifyContent="center" sx={{ my: 5 }}>
            <img width="200" height="200" src={state.photo} alt="avatar" />
            <Button
              type="file"
              color="success"
              variant="outlined"
              onClick={() => inputFileRef.current.click()}
            >
              Change Photo
            </Button>
          </Grid>
          <Grid container item xs={8} alignItems="center">
            <Grid item xs={12} sx={{ mb: 1 }}>
              <TextField
                variant="standard"
                margin="dense"
                size="small"
                name="cvName"
                value={state.cvName}
                onChange={handleChange}
                placeholder="CV Name"
                color="success"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              <TextField
                variant="standard"
                fullWidth
                margin="dense"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Your Full Name"
                color="success"
              />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" fontWeight={"bold"}>
                Birthday
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  variant="inline"
                  name="birthday"
                  value={state.birthday}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />{" "}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" fontWeight={"bold"}>
                Gender
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="gender"
                  value={state.gender}
                  onChange={handleChangeGender}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio color="success" />}
                    label="Male"
                  />
                  <FormControlLabel
                    value={0}
                    control={<Radio color="success" />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
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
          </Grid>
        </Grid>
        <Typography variant="h5" color="success.main" fontWeight={"bold"}>
          Objective
        </Typography>
        <Divider />
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          name="objective"
          multiline
          rows={4}
          value={state.objective}
          onChange={handleChange}
        />
        <Typography variant="h5" color="success.main" fontWeight={"bold"}>
          Skills
        </Typography>

        <Divider />
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          name="experience"
          multiline
          rows={4}
          value={state.experience}
          onChange={handleChange}
        />
        <Typography variant="h5" color="success.main" fontWeight={"bold"}>
          Experience
        </Typography>

        <Divider />
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          name="skills"
          multiline
          rows={4}
          value={state.skills}
          onChange={handleChange}
        />
        {alert.message && !alert.param ? (
          <Alert severity={alert.severity} sx={{ mt: 2 }}>
            {alert.message}
          </Alert>
        ) : null}
        <Grid container item xs={12} justifyContent="center" sx={{ my: 5 }}>
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
      <LoadingLayer open={isLoading} />
      <input
        type="file"
        ref={inputFileRef}
        onChange={changeAvatar}
        accept="image/*"
        style={{ display: "none" }}
      />
    </Container>
  );
}

export default NewCV;
