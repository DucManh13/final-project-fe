import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { getInfo } from "../services/AxiosServices";
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

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getInfo(
      "/feedback/",
      (response) => {
        if (mounted) {
          setFeedbacks(response.data);
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
  }, []);

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
          Feedbacks
        </Typography>

        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Feedback</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((feedback) => (
                <StyledTableRow key={feedback.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {feedback.username}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {feedback.content}
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

export default Feedbacks;
