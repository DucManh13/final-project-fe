import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { postInfo } from "../services/AxiosServices";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import ImageFadeIn from "react-image-fade-in";

function NewJob() {
  const { loggedInUser } = useContext(AuthContext);

  const [state, setState] = useState({
    feedback: "",
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.feedback === "") {
      setAlert({
        severity: "error",
        message: "Please write your feedback!",
      });
    } else {
      setAlert({ severity: "info", message: "Sending Feedback...Please wait" });
      postInfo(
        "/feedback",
        { content: state.feedback, accountId: loggedInUser.id },
        (response) => {
          setAlert({ ...alert, message: "" });
          setState({
            feedback: "",
          });
          toast.success(response.data);
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
          Send your feedback about our website
        </Typography>
        <Divider />
        <Grid container spacing={1} sx={{ my: 3 }}>
          <Grid item xs={7}>
            <Typography
              fontWeight={"bold"}
              sx={{
                pb: 2,
              }}
            >
              We're glad to receive your feedback!
            </Typography>

            <TextField
              variant="outlined"
              fullWidth
              margin="dense"
              name="feedback"
              multiline
              rows={4}
              width={"50%"}
              value={state.feedback}
              onChange={handleChange}
            />
            {alert.message && !alert.param ? (
              <Alert severity={alert.severity} sx={{ my: 1 }}>
                {alert.message}
              </Alert>
            ) : null}
            <Button
              variant="contained"
              color="success"
              size="large"
              disableElevation
              onClick={handleSubmit}
              sx={{ my: 1 }}
            >
              SEND
            </Button>
          </Grid>
          <Grid item xs={5}>
          <ImageFadeIn width={"100%"} height={"100%"} src={"img_feedback.jpg"} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default NewJob;
