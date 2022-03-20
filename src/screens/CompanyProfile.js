import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Edit from "@mui/icons-material/Edit";
import NoteAdd from "@mui/icons-material/NoteAdd";
import Preview from "@mui/icons-material/Preview";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { EDIT_PROFILE_URL, NEWJOB_URL, EDIT_JOB_URL } from "../config";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { postInfo } from "../services/AxiosServices";
import { AuthContext } from "../contexts/AuthContext";
import AssignmentInd from "@mui/icons-material/AssignmentInd";
import LoadingLayer from "../components/LoadingLayer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CompanyProfile() {
  const [state, setState] = useState();
  const [username, setUsername] = useState();
  const [jobs, setJobs] = useState([]);
  const { loggedInUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    if (loggedInUser) {
      postInfo(
        "/account/username",
        loggedInUser,
        (response) => {
          if (mounted) {
            setUsername(response.data);
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

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    if (loggedInUser) {
      postInfo(
        "/job",
        { id: loggedInUser.id },
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
    }
    return () => {
      mounted = false;
    };
  }, [loggedInUser]);

  return (
    <Container maxWidth="lg">
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
            Company Profile
          </Typography>
          <Link to={EDIT_PROFILE_URL} component={RouterLink} underline="none">
            <Button
              variant="contained"
              color="success"
              disableElevation
              startIcon={<Edit />}
            >
              Edit Profile
            </Button>
          </Link>
        </Box>
        <Divider />

        {state && username && (
          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item container xs={9}>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Username
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {username}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Company Name
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {state.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Website
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {state.website}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {state.email}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {state.address}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Phone
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {state.phone}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" fontWeight={"bold"}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" color={"text.secondary"}>
                  {state.description}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <img
                width="200"
                height="200"
                src={state.logo}
                alt="Company Logo"
              />
            </Grid>
          </Grid>
        )}
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          mx: 10,
          my: { xs: 1, md: 2 },
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
            Job List
          </Typography>
          <Link to={NEWJOB_URL} component={RouterLink} underline="none">
            <Button
              variant="contained"
              color="success"
              disableElevation
              startIcon={<NoteAdd />}
            >
              New Job
            </Button>
          </Link>
        </Box>
        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <StyledTableRow key={job.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {job.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link
                      to={`/jobs/${job.id}`}
                      component={RouterLink}
                      underline="none"
                    >
                      <Button
                        color="info"
                        startIcon={<Preview />}
                        sx={{ mr: 3 }}
                      >
                        View
                      </Button>
                    </Link>
                    <Link
                      to={EDIT_JOB_URL}
                      state={{ jobId: job.id }}
                      component={RouterLink}
                      underline="none"
                    >
                      <Button
                        color="warning"
                        startIcon={<Edit />}
                        sx={{ mr: 3 }}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Link
                      to={`/jobs/${job.id}/applicants`}
                      component={RouterLink}
                      underline="none"
                    >
                      <Button
                        color="success"
                        startIcon={<AssignmentInd />}
                        sx={{ mr: 3 }}
                      >
                        Applicants
                      </Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <LoadingLayer open={isLoading} />
    </Container>
  );
}

export default CompanyProfile;
