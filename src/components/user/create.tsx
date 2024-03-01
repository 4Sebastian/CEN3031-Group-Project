"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { create } from '@/services/userHandling';

const CreateUserPage = () => {

  // State variables to store form data
  const [formData, setFormData] = useState({
    organizationId: '',
    username: '',
    email: '',
    password: '',
  });

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform user creation logic here, e.g., making API request to create a user
    console.log('Form data:', formData);
    var output = await create(formData);
    console.log(output.data)
    // Redirect to dashboard page after successful user creation
  };

  // Function to handle input changes
  const handleInputChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: 'white', p: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Create User
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Organization ID"
          fullWidth
          margin="normal"
          value={formData.organizationId}
          onChange={(e) => handleInputChange('organizationId', e.target.value)}
          required
        />
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          required
        />
        <TextField
          type="email"
          label="Email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create User
        </Button>
      </form>
    </Container>
  );
};

export default CreateUserPage;

