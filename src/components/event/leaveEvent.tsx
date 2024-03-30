
"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Snackbar } from '@mui/material';
import { leaveEvent } from '@/services/eventHandling';

const LeaveEventPage = () => {
  const [eventId, setEventId] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleLeaveEvent = async () => {
    try {
      setLoading(true);
      await attendEvent(eventId);
    } catch (error) {
      console.error('Error attending event:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to simulate attending the event (Replace with actual API call)
  const attendEvent = async (eventId: any) => {
    var something = await leaveEvent(eventId);
    console.log(something)
    setShowSnackbar(true);
    if (something.status == 200) {
      setSnackbarMessage('Leaving successful!');
    } else {
      setSnackbarMessage(something.data.error || something.data.message);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Leave Event
      </Typography>
      <TextField
        label="Event ID"
        fullWidth
        margin="normal"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLeaveEvent}
        disabled={loading}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Leave'}
      </Button>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default LeaveEventPage;

