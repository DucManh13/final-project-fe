import { Route, Routes, Link as RouterLink, Navigate } from "react-router-dom";
import "./App.css";
import {
  HOME_URL,
  LOGIN_URL,
  PROFILE_URL,
  SIGNUP_URL,
  CV_URL,
  NEWCV_URL,
  COMPANIES_URL,
  JOBS_URL,
  JOB_URL,
  NEWJOB_URL,
  COMPANY_URL,
  FEEDBACK_URL,
  APPLICANTS_URL,
  EDIT_PROFILE_URL,
  EDIT_CV_URL,
  EDIT_JOB_URL,
  FEEDBACKS_URL,
  ACCOUNTS_URL,
} from "./config";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Work from "@mui/icons-material/Work";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import CV from "./screens/CV";
import NewCV from "./screens/NewCV";
import EditCV from "./screens/EditCV";
import Companies from "./screens/Companies";
import Jobs from "./screens/Jobs";
import Job from "./screens/Job";
import NewJob from "./screens/NewJob";
import EditJob from "./screens/EditJob";
import Company from "./screens/Company";
import CompanyProfile from "./screens/CompanyProfile";
import Feedback from "./screens/Feedback";
import JobApplicants from "./screens/JobApplicants";
import EditProfile from "./screens/EditProfile";
import EditCompanyProfile from "./screens/EditCompanyProfile";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Feedbacks from "./screens/Feedbacks";
import Box from "@mui/material/Box";
import Accounts from "./screens/Accounts";

function App() {
  const { setLoggedInUser } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (localStorage && localStorage.getItem("token"))
      setLoggedInUser(JSON.parse(localStorage.getItem("token")));
  }, [setLoggedInUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedInUser("");
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          component="div"
          style={{
            backgroundColor: "transparent",
            height: "8vh",
          }}
        >
          <AppBar
            position="fixed"
            sx={{
              color: "#222222",
              bgcolor: "#ffffff",
              boxShadow: "0px 2px 1px #dddddd",
            }}
          >
            <Container maxWidth="lg">
              <Toolbar>
                <Box sx={{ display: "flex", flexGrow: 1 }}>
                  <Box sx={{ display: "flex", mt: 0.2 }}>
                    <Box sx={{ mt: 0.5 }}>
                      <Work />
                    </Box>
                    <Link
                      variant="h5"
                      color="success.main"
                      underline="none"
                      to="/"
                      component={RouterLink}
                      fontWeight={"bold"}
                      ml={0.5}
                      mr={3}
                    >
                      Job Search
                    </Link>
                  </Box>
                  {user?.roleId === 1 && (
                    <>
                      <Link
                        to={JOBS_URL}
                        component={RouterLink}
                        underline="none"
                      >
                        <Button color="success">Jobs</Button>
                      </Link>
                      <Link
                        to={COMPANIES_URL}
                        component={RouterLink}
                        underline="none"
                      >
                        <Button color="success">Companies</Button>
                      </Link>
                    </>
                  )}
                  {(user?.roleId === 1 || user?.roleId === 2) && (
                    <Link
                      to={FEEDBACK_URL}
                      component={RouterLink}
                      underline="none"
                    >
                      <Button color="success">Feedback</Button>
                    </Link>
                  )}
                  {user?.roleId === 3 && (
                    <>
                      <Link
                        to={ACCOUNTS_URL}
                        component={RouterLink}
                        underline="none"
                      >
                        <Button color="success">Accounts</Button>
                      </Link>
                      <Link
                        to={JOBS_URL}
                        component={RouterLink}
                        underline="none"
                      >
                        <Button color="success">Jobs</Button>
                      </Link>
                      <Link
                        to={FEEDBACKS_URL}
                        component={RouterLink}
                        underline="none"
                      >
                        <Button color="success">Feedbacks</Button>
                      </Link>
                    </>
                  )}
                </Box>
                {!user ? (
                  <>
                    <Link
                      to={LOGIN_URL}
                      component={RouterLink}
                      underline="none"
                    >
                      <Button color="success">LOGIN</Button>
                    </Link>
                    <Link
                      to={SIGNUP_URL}
                      component={RouterLink}
                      underline="none"
                    >
                      <Button color="success">SIGN UP</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={PROFILE_URL}
                      component={RouterLink}
                      underline="none"
                    >
                      <Button color="success">PROFILE</Button>
                    </Link>
                    <Button color="success" onClick={handleLogout}>
                      LOG OUT
                    </Button>
                  </>
                )}
              </Toolbar>
            </Container>
          </AppBar>
        </Typography>
      </Container>

      <ScrollToTop>
        <Routes>
          {!user && (
            <>
              <Route path={LOGIN_URL} element={<Login />} />
              <Route path={SIGNUP_URL} element={<SignUp />} />
              <Route path={HOME_URL} element={<Navigate to={LOGIN_URL} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
          {user?.roleId === 1 && (
            <>
              <Route path={HOME_URL} element={<Jobs />} />
              <Route path={JOBS_URL} element={<Jobs />} />
              <Route path={JOB_URL} element={<Job />} />
              <Route path={PROFILE_URL} element={<Profile />} />
              <Route path={EDIT_PROFILE_URL} element={<EditProfile />} />
              <Route path={CV_URL} element={<CV />} />
              <Route path={NEWCV_URL} element={<NewCV />} />
              <Route path={EDIT_CV_URL} element={<EditCV />} />
              <Route path={COMPANIES_URL} element={<Companies />} />
              <Route path={COMPANY_URL} element={<Company />} />
              <Route path={FEEDBACK_URL} element={<Feedback />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}{" "}
          {user?.roleId === 2 && (
            <>
              <Route path={HOME_URL} element={<CompanyProfile />} />
              <Route path={JOB_URL} element={<Job />} />
              <Route path={PROFILE_URL} element={<CompanyProfile />} />
              <Route path={EDIT_PROFILE_URL} element={<EditCompanyProfile />} />
              <Route path={APPLICANTS_URL} element={<JobApplicants />} />
              <Route path={NEWJOB_URL} element={<NewJob />} />
              <Route path={EDIT_JOB_URL} element={<EditJob />} />
              <Route path={CV_URL} element={<CV />} />
              <Route path={FEEDBACK_URL} element={<Feedback />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
          {user?.roleId === 3 && (
            <>
              <Route path={HOME_URL} element={<Accounts />} />
              <Route path={ACCOUNTS_URL} element={<Accounts />} />
              <Route path={JOBS_URL} element={<Jobs />} />
              <Route path={JOB_URL} element={<Job />} />
              <Route path={FEEDBACKS_URL} element={<Feedbacks />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </ScrollToTop>
      <ToastContainer theme="colored" autoClose={2000} />
    </>
  );
}

export default App;
