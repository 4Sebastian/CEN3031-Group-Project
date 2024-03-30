import { logout } from '@/services/userHandling';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LogButton = (props: { loggedIn: boolean }) => {
  const router = useRouter();
  const [buttonString, setButtonString] = useState('Login');

  useEffect(() => {
    // Update buttonString based on loggedIn prop
    setButtonString(props.loggedIn ? 'Logout' : 'Login');
  }, [props.loggedIn]);

  // Function to handle logout or login
  const handleClick = () => {
    if (props.loggedIn) {
      console.log('Logged out');
      logout();
      router.push('/');
    } else {
      router.push('/login/login');
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick} fullWidth>
      {buttonString}
    </Button>
  );
};

export default LogButton;
