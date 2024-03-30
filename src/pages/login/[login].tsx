'use client';
import { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { login } from '@/services/userHandling';
import { useRouter } from 'next/router';

export const LoginPage = () => {
   
  // State variables to store username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform login logic here, e.g., making API request to authenticate user
    console.log('Logging in with username:', username, 'and password:', password);
    var output = await login(username, password);
    console.log(output.status == 200 ? "Login success" : "Login failed");
    // Redirect to dashboard page after successful login
    if(output.status == 200){
        router.push('/');
    }
    
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
