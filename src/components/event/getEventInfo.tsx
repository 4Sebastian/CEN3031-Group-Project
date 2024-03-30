
"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import { getEventInfo } from '@/services/eventHandling';

const EventInfoPage = () => {
  const [eventId, setEventId] = useState('');
  const [eventData, setEventData] = useState<any>();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleFetchEvent = async () => {
    try {
      // Call an asynchronous function to fetch event data using eventId
      const data = await fetchEventData(eventId);
      setEventData(data);
      setShowSnackbar(false);
    } catch (error) {
      console.error('Error fetching event data:', error);
      setEventData(null);
      setShowSnackbar(true);
      setSnackbarMessage('Error fetching event data. Please try again.');
      setSnackbarSeverity('error');
    }
  };

  // Function to simulate fetching event data (Replace with actual API call)
  const fetchEventData = async (eventId: any) => {
    // For demonstration purposes, let's use dummy data
    var something = await getEventInfo(eventId);
    console.log(something)
    if (something.status == 200) {
      return something.data;
    }
    return {};
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const formatDateTime = (dateTimeString: string): string => {
    if (dateTimeString) {
      const utcDateTime = new Date(dateTimeString);

      const timeZoneOffset = utcDateTime.getTimezoneOffset();

      const localDateTime = new Date(utcDateTime.getTime() - timeZoneOffset * 60000);

      return `${localDateTime.toLocaleDateString()} ${localDateTime.toLocaleTimeString()}`;
    }
    return "";
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Event Info
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
        onClick={handleFetchEvent}
        fullWidth
        sx={{ mt: 2 }}
      >
        Enter
      </Button>
      {eventData && (
        <div>
          <Typography color="black" variant="h5" gutterBottom>
            Event Details
          </Typography>
          <Typography color="black" variant="body1" gutterBottom>
            ID: {eventData.id}
          </Typography>
          <Typography color="black" variant="body1" gutterBottom>
            Creator: {eventData.creator}
          </Typography>
          <Typography color="black" variant="body1" gutterBottom>
            Date & Time: {formatDateTime(eventData.datetime)}
          </Typography>
          <Typography color="black" variant="body1" gutterBottom>
            Recommended Skill Level: {eventData.recommendedskilllevel}
          </Typography>
          <Typography color="black" variant="body1" gutterBottom>
            Location: {eventData.location}
          </Typography>
        </div>
      )}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
}

export default EventInfoPage;

