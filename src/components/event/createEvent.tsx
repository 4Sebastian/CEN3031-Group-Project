
"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar, MenuItem } from '@mui/material';
import { createEvent } from '@/services/eventHandling';

const CreateEventPage = () => {
  const [dateTime, setDateTime] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [location, setLocation] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCreateEvent = async () => {
    // Here you would perform the logic to create the event using the form data.
    // For the sake of this example, let's assume the event creation is successful.
    // In a real application, you would likely make an API request to create the event.
    // Simulating a successful event creation:
    setSnackbarMessage('Event created successfully!');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
    console.log(dateTime)

    const localDateTime = new Date(dateTime);

    // Get the time zone offset in minutes
    const timeZoneOffset = localDateTime.getTimezoneOffset();

    // Convert the local date time to UTC by subtracting the time zone offset
    const utcDateTime = new Date(localDateTime.getTime() + timeZoneOffset * 60000).toISOString();

    // console.log(utcDateTime.toString())
    const something = await createEvent({
      name: "",
      datetime: utcDateTime.toString(),
      recommendedskilllevel: skillLevel,
      location: location,
      visibility: visibility
    })
    console.log(something)

    // Clear the form fields after successful event creation
    setDateTime('');
    setSkillLevel('');
    setLocation('');
    setVisibility('Public');
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Create Event
      </Typography>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateEvent(); }}>
        <TextField
          label="Date & Time"
          type="datetime-local"
          fullWidth
          margin="normal"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          select
          label="Skill Level"
          fullWidth
          margin="normal"
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          required
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </TextField>
        <TextField
          select
          label="Visibility"
          fullWidth
          margin="normal"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          required
        >
          <MenuItem value="Public">Public</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
        </TextField>
        <TextField
          label="Location"
          fullWidth
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create Event
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
export default CreateEventPage;

