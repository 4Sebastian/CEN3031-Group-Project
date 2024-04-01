
"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { removeFriend } from '@/services/friendHandling';

const RemoveFriendPage = () => {
  const [friendCode, setFriendCode] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleRemoveFriend = async () => {
    var something = await removeFriend(friendCode)
    console.log(something)
    setShowSnackbar(true)
    if (something.status == 200) {
      setSnackbarSeverity('success');
      setSnackbarMessage('Friend Removed successfully!');
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
        Remove Friend
      </Typography>
      <form onSubmit={(e) => { e.preventDefault(); handleRemoveFriend(); }}>
        <TextField
          label="Friend Code"
          fullWidth
          margin="normal"
          value={friendCode}
          onChange={(e) => setFriendCode(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Remove Friend
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

export default RemoveFriendPage;

