import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paid from "@mui/icons-material/Paid";
import LocationCity from "@mui/icons-material/LocationCity";
import Divider from "@mui/material/Divider";
import { useState, useEffect, useContext } from "react";
import { getInfo, postInfo } from "../services/AxiosServices";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import CVDialog from "../components/CVDialog";
import LoadingLayer from "../components/LoadingLayer";
import { toast } from "react-toastify";

function Job() {
  const [job, setJob] = useState();
  const [apply, setApply] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let { jobId } = useParams();
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getInfo(
      "/job/" + jobId,
      (response) => {
        if (mounted) {
          setJob(response.data);
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
  }, [jobId]);

  useEffect(() => {
    let mounted = true;
    if (loggedInUser && loggedInUser.roleId===1) {
      postInfo(
        "job/check-apply",
        { jobId, accountId: loggedInUser.id },
        (response) => {
          if (mounted) setApply(!response.data);
        },
        (error) => {}
      );
    }
    return () => {
      mounted = false;
    };
  }, [jobId, loggedInUser, apply]);

  const handleSubmit = (cvId) => {
    let mounted = true;
    setIsLoading(true);
    postInfo(
      "/job/apply",
      {
        jobId,
        cvId,
      },
      (response) => {
        if (mounted) {
          setApply(false);
          setIsOpen(false);
          setIsLoading(false);
          toast.success(response.data);
        }
      },
      (error) => {
        setApply(false);
        setIsOpen(false);
        setIsLoading(false);
      }
    );
  };
  return (
    <>
      <Container maxWidth="lg">
        {job && (
          <Paper
            variant="outlined"
            sx={{
              mx: 10,
              mt: 3,
              py: 2,
              px: 4,
            }}
          >
            <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
              <Grid container item xs={3} justifyContent="center">
                <img
                  width="150"
                  height="150"
                  src={job.company.logo}
                  alt="Company Logo"
                />
              </Grid>
              <Grid item xs={9}>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography
                    variant="h4"
                    color="success.main"
                    fontWeight={"bold"}
                    flexGrow={1}
                  >
                    {job.name}
                  </Typography>
                  {loggedInUser.roleId === 1 && (
                    <Button
                      variant="contained"
                      color="success"
                      disableElevation
                      onClick={() => setIsOpen(true)}
                      disabled={!apply}
                    >
                      {apply ? "APPLY NOW" : "APPLIED"}
                    </Button>
                  )}
                </Box>
                <Typography variant="h6" color="text.secondary">
                  {"Code Engine Studio"}
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
              </Grid>
            </Grid>
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
              variant="h6"
              mt={1}
              mb={2}
              whiteSpace={"pre-wrap"}
              lineHeight={"2"}
            >
              {job.description}
            </Typography>
            <Divider
              textAlign="left"
              sx={{
                width: "50%",
              }}
            >
              <Typography variant="h5" color="success.main">
                Requirements
              </Typography>
            </Divider>
            <Typography
              variant="h6"
              mt={1}
              mb={2}
              whiteSpace={"pre-wrap"}
              lineHeight={"2"}
            >
              {job.requirements}
            </Typography>
            <Divider
              textAlign="left"
              sx={{
                width: "50%",
              }}
            >
              <Typography variant="h5" color="success.main">
                Benefits
              </Typography>
            </Divider>
            <Typography
              variant="h6"
              mt={1}
              mb={2}
              whiteSpace={"pre-wrap"}
              lineHeight={"2"}
            >
              {job.benefits}
            </Typography>
          </Paper>
        )}
        {isOpen && (
          <CVDialog
            isOpen
            handleSubmit={(cvId) => handleSubmit(cvId)}
            handleClose={() => {
              setIsOpen(false);
            }}
          />
        )}
      </Container>
      <LoadingLayer open={isLoading} />
    </>
  );
}

export default Job;
