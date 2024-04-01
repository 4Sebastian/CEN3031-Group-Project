
"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { addFriend } from '@/services/friendHandling';

const AddFriendPage = () => {
  const [friendCode, setFriendCode] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleAddFriend = async () => {
    var something = await addFriend(friendCode)
    console.log(something)
    setShowSnackbar(true)
    if (something.status == 200) {
      setSnackbarSeverity('success');
      setSnackbarMessage('Friend added successfully!');
    } else {
      setSnackbarSeverity('error');
      setSnackbarMessage(something.data.error);
    }
    setFriendCode('');
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Add Friend
      </Typography>
      <form onSubmit={(e) => { e.preventDefault(); handleAddFriend(); }}>
        <TextField
          label="Friend Code"
          fullWidth
          margin="normal"
          value={friendCode}
          onChange={(e) => setFriendCode(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Friend
        </Button>
      </form>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default AddFriendPage;

