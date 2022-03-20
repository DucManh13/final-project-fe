import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getInfo } from "../services/AxiosServices";
import AssignmentInd from "@mui/icons-material/AssignmentInd";
import { useParams } from "react-router-dom";
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

function JobApplicants() {
  let { jobId } = useParams();
  const [CVs, setCVs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getInfo(
      "/job/" + jobId + "/applicants",
      (response) => {
        if (mounted) {
          setCVs(response.data);
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

  return (
    <Container maxWidth="lg">
      <Paper
        variant="outlined"
        sx={{
          mx: 10,
          my: { xs: 1, md: 2 },
          p: { xs: 2, md: 3 },
          minHeight: "40vh",
        }}
      >
        <Typography
          variant="h4"
          color="success.main"
          fontWeight={"bold"}
          marginBottom={2}
        >
          Job Applicants
        </Typography>

        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Applicant Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center">CV</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CVs.map((CV) => (
                <StyledTableRow key={CV.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {CV.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {CV.email}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {CV.phone}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link
                      to={`/cvs/${CV.id}`}
                      component={RouterLink}
                      underline="none"
                    >
                      <Button
                        color="info"
                        startIcon={<AssignmentInd />}
                        sx={{ mr: 3 }}
                      >
                        View
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

export default JobApplicants;
