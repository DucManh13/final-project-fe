import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import Mail from '@mui/icons-material/Mail';
import Home from '@mui/icons-material/Home';
import PermContactCalendar from '@mui/icons-material/PermContactCalendar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';

function SignUp() {

  const [state, setState] = useState({
    name: '',
    password: '',
    age:'',
    email:'',
    address:'',
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
    if (state.name === '' || state.password === ''||state.age === '' || state.email === ''||state.address === '') {
      setAlert({
        severity: 'error',
        message: 'Please enter all required information!',
      });
    } else {
      setAlert({ severity: 'info', message: 'Verifying...Please wait' });
    }
  };
  const [value, setValue] = useState('one');

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
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
      <Grid item xs={12} sm={8} md={4} sx={{px: 8, pt:6}}>
        <form onSubmit={handleSubmit}>
          
        <Typography variant="h5" align="center">
            <Box fontWeight="fontWeightBold">SIGN UP</Box>
          </Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeValue} aria-label="basic tabs example">
            <Tab value="1" label="As Applicant"/>
            <Tab value="0" label="As Company"/>
          </Tabs>
        </Box>
          <Typography variant="subtitle1">Name</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="name"
            value={state.name}
            onChange={handleChange}
            size="small"
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
            size="small"
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
          <Divider sx={{mt:2}}/>
          <Typography variant="subtitle1">Age</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="age"
            type="number"
            value={state.age}
            onChange={handleChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PermContactCalendar />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="subtitle1">Email</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="email"
            value={state.email}
            onChange={handleChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="subtitle1">Address</Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            name="address"
            value={state.address}
            onChange={handleChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Home />
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disableElevation
            sx={{ px:5, mt:2 }}
          >
            SIGN UP
          </Button>
        </form>
        {alert.message && !alert.param ? (
          <Alert severity={alert.severity} sx={{mt:2}}>
            {alert.message}
          </Alert>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default SignUp;
