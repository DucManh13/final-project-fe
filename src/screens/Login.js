import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid'
import { SIGNUP_URL } from '../config';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';

function Login() {

  const [state, setState] = useState({
    name: '',
    password: '',
  });
  const [alert, setAlert] = useState({
    severity: '',
    message: '',
  });

  useEffect(() => {
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAlert({ ...alert, message: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.name === '' || state.password === '') {
      setAlert({
        severity: 'error',
        message: 'Please enter your username and password!',
      });
    } else {
      setAlert({ severity: 'info', message: 'Verifying...Please wait' });
    }
  };

  return (
    <Grid container sx={{height: '100vh'}}>
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: 'url(img_welcome.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={4} sx={{px: 5, pt:15}}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" align="center">
            <Box fontWeight="fontWeightBold">LOGIN</Box>
          </Typography>
          <Typography variant="subtitle1">Name</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="name"
            value={state.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          {alert.message && alert.param === 'name' ? (
            <Typography
              variant="body2"
              component="div"
              color="error"
            >
              {alert.message}
            </Typography>
          ) : null}
          <Typography variant="subtitle1">Password</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          {alert.message && alert.param === 'password' ? (
            <Typography
              variant="body2"
              component="div"
              color="error"
            >
              {alert.message}
            </Typography>
          ) : null}
          <Link href={""} variant="body2" component="p" color="textPrimary">
            Forgot Password
          </Link>
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disableElevation
            sx={{ px:5, my:2 }}
          >
            LOGIN
          </Button>
          <Link href={SIGNUP_URL} color="textPrimary">
          <Typography variant="body2" align="center">
            Not have an account?
            <strong>{' Sign Up'}</strong>
          </Typography>
        </Link>
        </Box>
        {alert.message && !alert.param ? (
          <Alert severity={alert.severity} sx={{ my:2 }}>
            {alert.message}
          </Alert>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default Login;
