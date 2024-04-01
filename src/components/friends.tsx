import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { addFriend, getFriends, removeFriend } from '@/services/friendHandling';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFriendInfo } from '@/services/friendHandling';

export default function FriendsList(props: { checkUser: string }) {
  const [friendsList, setFriendsList] = useState<any[]>([]);
  const [addFriendDialogOpen, setAddFriendDialogOpen] = useState(false);
  const [friendCode, setFriendCode] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const router = useRouter();

  const handleViewFriend = (friend: any) => {
    router.push(`/users/${friend.username}`);
  };

  const handleAddFriendClick = () => {
    setAddFriendDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setAddFriendDialogOpen(false);
    setFriendCode('');
  };

  const handleFriendCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFriendCode(event.target.value);
  };

  const handleAddFriend = async () => {
    try {
      console.log('Adding friend with code:', friendCode);
      const response = await addFriend(friendCode);
      if (response.status === 200) {
        setSnackbarMessage('Friend added successfully.');
        setSnackbarOpen(true);
        handleCloseAddFriendDialog();
        fetchFriends()
      } else {
        setSnackbarMessage(response.data.error);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      setSnackbarMessage('Failed to add friend.');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteFriend = async (friend: any) => {
      const response = await removeFriend((await getFriendInfo(friend.username)).data.friendcode)
      if (response.status === 200) {
        setSnackbarMessage('Friend removed successfully.');
        setSnackbarOpen(true);
        handleCloseAddFriendDialog();
        fetchFriends()
      }
      else{
        setSnackbarMessage(response.data.error);
        setSnackbarOpen(true);
      }
      fetchFriends()
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const fetchFriends = async () => {
    try {
      const response = await getFriends();
      console.log("I may be looping")
      if (response.status === 200) {
        setFriendsList(response.data);
        console.log(friendsList)
      } else {
        setFriendsList([])
        console.error('Failed to fetch friends');
      }
    } catch (error) {
      console.error('Error while fetching friends:', error);
    }
  };

  useEffect(() => {
    
    fetchFriends();
  }, [props.checkUser]);

  return (
    <Box sx={{
      width: 0.3,
      height: 1,
      backgroundColor: 'rgba(128, 128, 128, 0.75)',
      borderRadius: '15px',
      transition: 'box-shadow 0.1s ease',
      '&:hover': {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      },
    }}>
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
        <Typography variant="h5" color="black" sx={{ marginBottom: 2 }}>
          Friends List
        </Typography>
        {friendsList.map((friend, index) => (
          <Box key={index} sx={{
            backgroundColor: 'lightblue',
            borderRadius: '8px',
            width: '22vw',
            padding: '12px',
            marginBottom: '16px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Typography color="black" sx={{ flexGrow: 1 }}>{friend.username}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="contained" color="primary" onClick={() => handleViewFriend(friend)}>
                View
              </Button>
              <IconButton color="error" aria-label="delete" onClick={() => handleDeleteFriend(friend)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={handleAddFriendClick}>
          Add Friend
        </Button>
        <Dialog open={addFriendDialogOpen} onClose={handleCloseAddFriendDialog}>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="friend-code"
              label="Friend Code"
              type="text"
              fullWidth
              value={friendCode}
              onChange={handleFriendCodeChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddFriendDialog}>Cancel</Button>
            <Button onClick={handleAddFriend} color="primary">Add</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Stack>
    </Box>
  );
}
