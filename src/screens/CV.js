import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { getInfo } from "../services/AxiosServices";
import { useParams } from "react-router-dom";

function CV() {
  const [cv, setCv] = useState();
  let { cvId } = useParams();

  useEffect(() => {
    let mounted = true;
    getInfo(
      "/cv/" + cvId,
      (response) => {
        if (mounted) setCv(response.data);
      },
      (error) => {}
    );
    return () => {
      mounted = false;
    };
  }, [cvId]);

  const formatDate = (date) => {
    return `${date.slice(8,10)}/${date.slice(5,7)}/${date.slice(0,4)}`;
  };

  return (
    <Container maxWidth="lg">
      {cv && (
        <Paper
          variant="outlined"
          sx={{
            mx: 10,
            mt: 3,
            py: 2,
            px: 4,
          }}
        >
          <Grid container spacing={1} sx={{ my: 3 }}>
            <Grid container item xs={4} justifyContent="center">
              <img width="200" height="200" src={cv.photo} alt="avatar" />
            </Grid>
            <Grid container item xs={8}>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  color="success.main"
                  fontWeight={"bold"}
                >
                  {cv.name}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Birthday
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {formatDate(cv.birthday)}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Gender
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {cv.gender ? "Male" : "Female"}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {cv.email}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Phone
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {cv.phone}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {cv.address}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="h4" color="success.main" fontWeight={"bold"}>
            Objective
          </Typography>
          <Divider />
          <Typography variant="h6" mt={1} mb={2} whiteSpace={"pre-wrap"}>
            {cv.objective}
          </Typography>
          <Typography variant="h4" color="success.main" fontWeight={"bold"}>
            Skills
          </Typography>

          <Divider />
          <Typography variant="h6" mt={1} mb={2} whiteSpace={"pre-wrap"}>
            {cv.skills}
          </Typography>
          <Typography variant="h4" color="success.main" fontWeight={"bold"}>
            Experience
          </Typography>

          <Divider />
          <Typography variant="h6" mt={1} mb={2} whiteSpace={"pre-wrap"}>
            {cv.experience}
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default CV;
