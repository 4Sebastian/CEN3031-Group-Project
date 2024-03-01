"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { changePassword } from '@/services/userHandling';

const ChangePasswordPage = () => {

  // State variables to store form data
  const [formData, setFormData] = useState({
    organizationId: '',
    password: '',
    newPassword: '',
  });

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform change password logic here, e.g., making API request to change password
    console.log('Form data:', formData);
    var output = await changePassword(formData);
    console.log(output);
    // Redirect to dashboard page after successful password change
  };

  // Function to handle input changes
  const handleInputChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: 'white', padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Change Password
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
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          required
        />
        <TextField
          type="password"
          label="New Password"
          fullWidth
          margin="normal"
          value={formData.newPassword}
          onChange={(e) => handleInputChange('newPassword', e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Change Password
        </Button>
      </form>
    </Container>
  );
};

export default ChangePasswordPage;
