import { getFriends } from '@/services/friendHandling';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { FriendFields } from '../../functions/src/components/friends';

const friendsData = [
  'Friend 1',
  'Friend 2',
  'Friend 3',
  // Add more friends as needed
];



export default function FriendsList() {

  const [friendsList, setFriendsList] = useState<any[]>([]);

  useEffect(() => {
    console.log('printing friends')
    const f = async () => {
      var something = await getFriends();
      console.log(something);
      if (something.status == 200) {
        
        setFriendsList(something.data);
        console.log('a friendly success')
      }
    }
    f();
  }, [friendsList]);
  

  return (
    <Box sx={{
      width: 0.3,
      height: 1, // Adjust the height as needed
      backgroundColor: 'rgba(128, 128, 128, 0.75)',
      borderRadius: '15px',
      transition: 'box-shadow 0.1s ease',
      '&:hover': {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      },
    }}
    >
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
        <Typography variant="h5" color="black" sx={{ marginBottom: 2 }}>
          Friends List
        </Typography>
        {friendsList.map((friend, index) => (
          <Box key={index} sx={{
            backgroundColor: 'lightblue',
            borderRadius: '8px',
            width: '22vw', // Adjust the width as needed
            padding: '12px',
            marginBottom: '16px', // Adjust the space between friends
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <Typography color="black">{friend.username}</Typography>
            <Button variant="contained" color="primary">
              View
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
