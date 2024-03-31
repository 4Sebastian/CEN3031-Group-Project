
"use client"
import { deleteEvent, getEventAttendees, getEventInfo, joinEvent, leaveEvent, updateEvent } from '@/services/eventHandling';
import { Button, CircularProgress, Dialog, MenuItem, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const UpdateGroup = (props: { getEvents: () => void, groupId: string, open: boolean, handleClose: () => void, handleSuccessfulClose: () => void, group: any }) => {

  const formatDateTime = (dateTimeString: string): string => {
    if (dateTimeString) {
      const utcDateTime = new Date(dateTimeString);
      const timeZoneOffset = utcDateTime.getTimezoneOffset();
      const localDateTime = new Date(utcDateTime.getTime() - timeZoneOffset * 60000);
      return localDateTime.toISOString().slice(0, -1);
    }
    return "";
  };

  const [formData, setFormData] = useState({
    name: props.group.name,
    location: props.group.location,
    recommendedskilllevel: props.group.recommendedskilllevel,
    datetime: formatDateTime(props.group.datetime),
    visibility: props.group.visibility?.toLowerCase() == 'public' ? 'Public' : 'Private',
  });

  useEffect(() => {
    setFormData({
      name: props.group.name,
      location: props.group.location,
      recommendedskilllevel: props.group.recommendedskilllevel,
      datetime: formatDateTime(props.group.datetime),
      visibility: props.group.visibility?.toLowerCase() == 'public' ? 'Public' : 'Private',
    });
  }, [props.groupId]);

  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Call your API to update the record with formData
      var data = { ...formData }

      const localDateTime = new Date(data.datetime);

      // Get the time zone offset in minutes
      const timeZoneOffset = localDateTime.getTimezoneOffset();

      // Convert the local date time to UTC by subtracting the time zone offset
      const utcDateTime = new Date(localDateTime.getTime() + timeZoneOffset * 60000).toISOString();

      data.datetime = utcDateTime;
      var something = await updateEvent(props.groupId, data);
      console.log(something)
      if (something.status == 200) {
        if (data.visibility != props.group.visibility) {
          props.getEvents();
        }
        setSnackbarMessage('Event updated successfully');
        setShowSnackbar(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setSnackbarMessage('Error updating event');
      setShowSnackbar(true);
      setLoading(false);
    }
  };
  //
  // const formatDateTime = (dateTimeString: string) => {
  //   if (dateTimeString) {
  //     const utcDateTime = new Date(dateTimeString);
  //     const timeZoneOffset = utcDateTime.getTimezoneOffset();
  //     const localDateTime = new Date(utcDateTime.getTime() - timeZoneOffset * 60000);
  //     return `${localDateTime.toLocaleDateString()} ${localDateTime.toLocaleTimeString()}`;
  //   }
  //   return '';
  // };
  //
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Paper sx={{ padding: 5 }}>
        <Typography variant="h5" gutterBottom>
          Event ID: {props.groupId}
        </Typography>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="recommendedskilllevel"
          select
          label="Recommended Skill Level"
          value={formData.recommendedskilllevel}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </TextField>
        <TextField
          name="datetime"
          label="Date & Time"
          type="datetime-local"
          value={formData.datetime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="visibility"
          select
          label="Visibility"
          value={formData.visibility}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="Public">Public</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
        </TextField>
        <Stack direction="row" justifyContent="space-between" sx={{ padding: 0 }}>
          <Button variant="contained" color="primary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Update'}
          </Button>
        </Stack>
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => { setShowSnackbar(false); props.handleSuccessfulClose(); }}
        message={snackbarMessage}
      />
    </Dialog>
  );
};

export default UpdateGroup;
