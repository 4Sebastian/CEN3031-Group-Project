"use client"
import { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { deleteUser } from '@/services/userHandling';

const DeleteUserPage = () => {

  // State variables to control dialogs and loading indicator
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle delete user
  const handleDeleteUser = async () => {
    // Show the delete confirmation dialog
    setOpenDeleteDialog(true);
  };

  // Function to confirm user deletion
  const confirmDeleteUser = async () => {
    // Show loading indicator
    setLoading(true);

    // Perform delete user logic here, e.g., making API request to delete the user
    try {
      var output = await deleteUser();
      console.log(output);
      // Assuming deletion was successful
      setDeletionSuccess(output.status == 200);
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
        Delete User
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleDeleteUser}>
        Delete User
      </Button>

      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteUser} color="secondary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback dialog */}
      <Dialog open={openFeedbackDialog} onClose={() => setOpenFeedbackDialog(false)}>
        <DialogTitle>Deletion Status</DialogTitle>
        <DialogContent>
          <Typography>{deletionSuccess ? 'User deleted successfully!' : 'Failed to delete user.'}</Typography>
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

export default DeleteUserPage;
