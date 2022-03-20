import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paid from "@mui/icons-material/Paid";
import LocationCity from "@mui/icons-material/LocationCity";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getInfo } from "../services/AxiosServices";
import LoadingLayer from "../components/LoadingLayer";
import Search from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Pagination from "../components/Pagination";

function Jobs() {
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const items = 10;

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getInfo(
      "/job",
      (response) => {
        if (mounted) {
          setData(response.data);
          setJobs(response.data);
          setPage({
            max: Math.floor((response.data.length - 1) / items),
            current: 0,
          });
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

  const handleChange = (event) => {
    const { value } = event.target;
    setKeyword(value.toLowerCase());
  };

  const handleSearch = () => {
    if (keyword) {
      let filteredJobs = data.filter(
        (job) => job.name.toLowerCase().indexOf(keyword) !== -1
      );
      setJobs(filteredJobs);
      setPage({
        max: Math.floor((filteredJobs.length - 1) / items),
        current: 0,
      });
    } else {
      setJobs(data);
      setPage({
        max: Math.floor((data.length - 1) / items),
        current: 0,
      });
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
            mt={1}
          >
            Job List
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <TextField
              variant="outlined"
              margin="dense"
              name="keyword"
              value={keyword}
              onChange={handleChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disableElevation
              color="success"
              sx={{ mt: 1, mb: 0.5, ml: 1 }}
            >
              Search
            </Button>
          </Box>
        </Box>
        {jobs && page && (
          <>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {jobs
                .slice(page.current * items, (page.current + 1) * items)
                .map((job) => (
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
                          alt={job.imageLabel}
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
            <Pagination page={page} setPage={setPage} offset={0} />
          </>
        )}
      </Paper>
      <LoadingLayer open={isLoading} />
    </Container>
  );
}

export default Jobs;
