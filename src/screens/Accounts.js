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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

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

function Accounts() {
  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getInfo(
      "/account/",
      (response) => {
        if (mounted) {
          setData(response.data.slice());
          setAccounts(response.data.slice());
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

  const handleSort = (event) => {
    let { value } = event.target;
    setSortBy(value);
    setFilterBy("");
    if (value === "id") {
      setAccounts(
        accounts.sort((a, b) => {
          if (a.id > b.id) return 1;
          else if (a.id < b.id) return -1;
          else return 0;
        })
      );
    } else if (value === "role") {
      setAccounts(
        accounts.sort((a, b) => {
          if (a.role > b.role) return 1;
          else if (a.role < b.role) return -1;
          else return 0;
        })
      );
    }
  };
  const handleFilter = (event) => {
    let { value } = event.target;
    setFilterBy(value);
    setSortBy("");
    if (value === "all") {
      setAccounts(data);
    } else {
      setAccounts(data.filter((account) => account.role === value));
    }
  };

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
          Accounts
        </Typography>

        <Divider />
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            value={sortBy}
            label="Sortby"
            onChange={handleSort}
          >
            <MenuItem value={"id"}>Id</MenuItem>
            <MenuItem value={"role"}>Role</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="filter-label">Filter role</InputLabel>
          <Select
            labelId="filter-label"
            value={filterBy}
            label="Filtertby"
            onChange={handleFilter}
          >
            <MenuItem value={"ROLE_APPLICANT"}>Applicant</MenuItem>
            <MenuItem value={"ROLE_COMPANY"}>Company</MenuItem>
            <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
            <MenuItem value={"all"}>All</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Id</StyledTableCell>
                <StyledTableCell align="center">Username</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Feedback</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <StyledTableRow key={account.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {account.id}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {account.username}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {account.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {account.role}
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

export default Accounts;
