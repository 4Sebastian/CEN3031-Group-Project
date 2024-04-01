import { getInfo, isLoggedIn, logout } from '@/services/userHandling';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LogButton = (props: { loggedIn: boolean, setCheckUser: Function }) => {
  const router = useRouter();
  const [buttonString, setButtonString] = useState('Login');
  let [loggedIn, setLogged] = useState<boolean>(false)

  useEffect(() => {
    // Update buttonString based on loggedIn prop
    setLogged(isLoggedIn());
    setButtonString(isLoggedIn() ? "Logout" : "Login");
  },[]);

  // Function to handle logout or login
  const handleClick = () => {
    if (loggedIn) {
      console.log('Logged out');
      logout();
      router.push('/');
      props.setCheckUser(true);
      setLogged(isLoggedIn());
      setButtonString(isLoggedIn() ? "Logout" : "Login");
    } else {
      props.setCheckUser(false)
      router.push('/login/login');
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick} sx={{ height: '40 px' }}>
      {buttonString}
    </Button>
  );
};

export default LogButton;
