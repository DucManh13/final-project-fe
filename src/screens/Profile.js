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
import { EDIT_CV_URL, EDIT_PROFILE_URL, NEWCV_URL } from "../config";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { postInfo } from "../services/AxiosServices";
import { AuthContext } from "../contexts/AuthContext";
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

function Profile() {
  const [state, setState] = useState();
  const [username, setUsername] = useState();
  const [CVs, setCVs] = useState([]);
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
        "/cv",
        { id: loggedInUser.id },
        (response) => {
          if (mounted) {
            setCVs(response.data);
            setIsLoading(false);
          }
        },
        (error) => {
          setIsLoading(true);
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
            Profile
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
                Name
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" color={"text.secondary"}>
                {state.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" fontWeight={"bold"}>
                Age
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" color={"text.secondary"}>
                {state.age}
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
            CV List
          </Typography>
          <Link to={NEWCV_URL} component={RouterLink} underline="none">
            <Button
              variant="contained"
              color="success"
              disableElevation
              startIcon={<NoteAdd />}
            >
              New CV
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
              {CVs.map((cv) => (
                <StyledTableRow key={cv.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {cv.cvName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link
                      to={`/cvs/${cv.id}`}
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
                      to={EDIT_CV_URL}
                      state={{ cvId: cv.id }}
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

export default Profile;
