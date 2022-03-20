import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paid from "@mui/icons-material/Paid";
import Phone from "@mui/icons-material/Phone";
import LocationCity from "@mui/icons-material/LocationCity";
import Email from "@mui/icons-material/Email";
import Web from "@mui/icons-material/Web";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getInfo } from "../services/AxiosServices";
import { useParams } from "react-router-dom";
import LoadingLayer from "../components/LoadingLayer";

function Company() {
  const [company, setCompany] = useState();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let { companyId } = useParams();

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getInfo(
      "/company/" + companyId,
      (response) => {
        if (mounted) {
          setCompany(response.data);
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
      }
    );
    return () => {
      mounted = false;
    };
  }, [companyId]);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getInfo(
      "/company/" + companyId + "/job",
      (response) => {
        if (mounted) {
          setJobs(response.data);
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
      }
    );
    return () => {
      mounted = false;
    };
  }, [companyId]);

  return (
    <Container maxWidth="lg">
      {company && (
        <>
          <Paper
            variant="outlined"
            sx={{
              mx: 10,
              mt: 3,
              py: 2,
              px: 4,
            }}
          >
            <Grid container spacing={2} sx={{ my: 1 }}>
              <Grid container item xs={3} justifyContent="center">
                <img
                  width="150"
                  height="150"
                  src={company.logo}
                  alt="Company Logo"
                />
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant="h4"
                  color="success.main"
                  fontWeight={"bold"}
                  flexGrow={1}
                  marginBottom={1}
                >
                  {company.name}
                </Typography>

                <Grid container sx={{ p: 1 }} spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Email sx={{ mr: 1 }} />
                      {company.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Phone sx={{ mr: 1 }} />
                      {company.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <LocationCity sx={{ mr: 1 }} />
                      {company.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Web sx={{ mr: 1 }} />
                      {company.website}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              mx: 10,
              my: 2,
              py: 2,
              px: 4,
            }}
          >
            <Divider
              textAlign="left"
              sx={{
                width: "50%",
              }}
            >
              <Typography variant="h5" color="success.main">
                Description
              </Typography>
            </Divider>
            <Typography
              mt={1}
              mb={2}
              whiteSpace={"pre-wrap"}
              lineHeight={"2"}
              fontWeight={"medium"}
            >
              {company.description}
            </Typography>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              mx: 10,
              my: 2,
              py: 2,
              px: 4,
            }}
          >
            <Divider
              textAlign="left"
              sx={{
                width: "50%",
              }}
            >
              <Typography variant="h5" color="success.main">
                Check our jobs!
              </Typography>
            </Divider>
            <Grid container spacing={3} sx={{ my: 1 }}>
              {jobs &&
                jobs.map((job) => (
                  <Grid item xs={12} md={6} key={job.id}>
                    <CardActionArea
                      component={RouterLink}
                      to={`/jobs/${job.id}`}
                    >
                      <Card sx={{ display: "flex", height: 150 }}>
                        <CardMedia
                          component="img"
                          sx={{
                            width: 150,
                            height: 150,
                            p: 2,
                            display: { xs: "none", sm: "block" },
                          }}
                          image={job.company.logo}
                          alt="Company Logo"
                        />
                        <CardContent sx={{ flex: 1, p: 1 }}>
                          <Typography
                            component="h2"
                            variant="h5"
                            color="success.main"
                          >
                            {job.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            {job.company.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <Paid />
                            {job.salary}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <LocationCity />
                            {job.address}
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            color="success.light"
                            align="right"
                          >
                            Details {">>"}
                          </Typography>
                        </CardContent>
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
            </Grid>
          </Paper>
        </>
      )}
      <LoadingLayer open={isLoading} />
    </Container>
  );
}

export default Company;
