"use client"
import { logout } from '@/services/userHandling';
import { Container, Typography, Button } from '@mui/material';

const LogoutPage = () => {

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here, e.g., clearing user session or token
    console.log('Logged out');
    logout();
    // Redirect to login page after logout
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: 'white', padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Logout
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout} fullWidth>
        Logout
      </Button>
    </Container>
  );
};

export default LogoutPage;
