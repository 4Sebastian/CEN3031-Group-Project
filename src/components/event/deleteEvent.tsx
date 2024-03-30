

"use client";
import { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, TextField } from '@mui/material';
import { deleteEvent } from '@/services/eventHandling'; // Assuming you have a function deleteEvent for deleting events

const DeleteEventPage = () => {
  // State variables to control dialogs, loading indicator, and event ID
  const [eventId, setEventId] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle delete event
  const handleDeleteEvent = () => {
    // Show the delete confirmation dialog
    setOpenDeleteDialog(true);
  };

  // Function to confirm event deletion
  const confirmDeleteEvent = async () => {
    // Show loading indicator
    setLoading(true);

    try {
      // Perform delete event logic here, e.g., making API request to delete the event
      const response = await deleteEvent(eventId); // Assuming deleteEvent function accepts eventId
      console.log(response);
      // Assuming deletion was successful
      setDeletionSuccess(response.status === 200);
    } catch (error) {
      // If deletion fails
      setDeletionSuccess(false);
    } finally {
      // Hide loading indicator
      setLoading(false);

      // Close the delete confirmation dialog
      setOpenDeleteDialog(false);

      // Show the feedback dialog after deletion process completes
      setOpenFeedbackDialog(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: 'white', padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Delete Event
      </Typography>
      <TextField
        label="Event ID"
        variant="outlined"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="secondary" onClick={handleDeleteEvent} disabled={!eventId}>
        Delete Event
      </Button>

      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this event?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteEvent} color="secondary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback dialog */}
      <Dialog open={openFeedbackDialog} onClose={() => setOpenFeedbackDialog(false)}>
        <DialogTitle>Deletion Status</DialogTitle>
        <DialogContent>
          <Typography>{deletionSuccess ? 'Event deleted successfully!' : 'Failed to delete event.'}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFeedbackDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeleteEventPage;

