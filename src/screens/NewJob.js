import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { postInfo } from '../services/AxiosServices';
import { useNavigate  } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import LoadingLayer from "../components/LoadingLayer";
import { toast } from "react-toastify";

function NewJob() {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    name: "",
    salary: "",
    address: "",
    description: "",
    requirements: "",
    benefits: "",
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

  const handleReset = () => {
    setState({
      ...state,
      name: "",
      salary: "",
      address: "",
      description: "",
      requirements: "",
      benefits: "",
    });
    setAlert({ ...alert, message: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      state.name === "" ||
      state.salary === "" ||
      state.address === "" ||
      state.description === "" ||
      state.requirements === "" ||
      state.benefits === ""
    ) {
      setAlert({
        severity: "error",
        message: "Please enter all required information!",
      });
    } else {
      setIsLoading(true);
      postInfo(
        "/job/new",
        {...state,accountId:loggedInUser.id},
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
          Create New Job
        </Typography>
        <Divider />

        <Grid container spacing={1} sx={{ my: 3 }}>
          <Grid container item xs={12} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="h6" fontWeight={"bold"}>
                Job name
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
                Salary
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                fullWidth
                margin="dense"
                name="salary"
                value={state.salary}
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
          Description
        </Typography>
        <Divider />
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
        <Typography variant="h5" color="success.main" fontWeight={"bold"}>
          Requirements
        </Typography>

        <Divider />
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          name="requirements"
          multiline
          rows={4}
          value={state.requirements}
          onChange={handleChange}
        />
        <Typography variant="h5" color="success.main" fontWeight={"bold"}>
          Benefits
        </Typography>

        <Divider />
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          name="benefits"
          multiline
          rows={4}
          value={state.benefits}
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
    </Container>
  );
}

export default NewJob;
