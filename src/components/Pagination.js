import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
function Pagination({ page, setPage, offset }) {
  const goToFirst = () => {
    setPage({ ...page, current: 0 });
    window.scrollTo(0, offset);
  };

  const goToPrevious = () => {
    setPage({ ...page, current: page.current > 0 ? page.current - 1 : 0 });
    window.scrollTo(0, offset);
  };

  const goToNext = () => {
    setPage({
      ...page,
      current: page.current < page.max ? page.current + 1 : page.max,
    });
    window.scrollTo(0, offset);
  };

  const goToLast = () => {
    setPage({ ...page, current: page.max });
    window.scrollTo(0, offset);
  };

  return (
    <Grid container item xs={12} justifyContent="center" sx={{ my: 5 }}>
      <Stack spacing={1} direction="row">
        <Button
          variant="contained"
          color="success"
          disableElevation
          disabled={page.current === 0}
          onClick={goToFirst}
        >
          <FirstPage />
        </Button>
        <Button
          variant="outlined"
          color="success"
          disableElevation
          disabled={page.current === 0}
          onClick={goToPrevious}
        >
          <NavigateBefore />
        </Button>
        <Button
          variant="outlined"
          color="success"
          disableElevation
          disabled={page.current === page.max}
          onClick={goToNext}
        >
          <NavigateNext />
        </Button>
        <Button
          variant="contained"
          color="success"
          disableElevation
          disabled={page.current === page.max}
          onClick={goToLast}
        >
          <LastPage />
        </Button>
      </Stack>
    </Grid>
  );
}
export default Pagination;
