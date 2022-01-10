import { Route, Routes } from 'react-router';
import './App.css';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import {
  HOME_URL,
  LOGIN_URL,
  PROFILE_URL,
  SIGNUP_URL,
} from './config';

function App() {
  return (
    <Routes>
      <Route path={HOME_URL} element={<Login />} />
      <Route path={LOGIN_URL} element={<Login />} />
      <Route path={SIGNUP_URL} element={<SignUp />} />
      <Route path={PROFILE_URL} element={<Profile />} />
    </Routes>
  );
}

export default App;
