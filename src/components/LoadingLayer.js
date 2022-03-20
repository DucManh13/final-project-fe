import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingLayer({ open }) {
  return (
    <Backdrop open={open} sx={{ zIndex: 1500 }}>
      <CircularProgress
        sx={{
          color: "white",
        }}
      />
    </Backdrop>
  );
}

export default LoadingLayer;
