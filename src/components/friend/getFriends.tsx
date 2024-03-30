
"use client"


import { getFriends } from '@/services/friendHandling';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useEffect, useState } from 'react';

const FriendsListPage = () => {
  const [friendsList, setFriendsList] = useState<any[]>([]);

  useEffect(() => {
    const f = async () => {
      var something = await getFriends();
      console.log(something);
      if (something.status == 200) {

        setFriendsList(something.data);
      }
    }
    f();
  }, []);


  const refreshFriendsList = async () => {
    // Here you would fetch the updated friends list data from the server.
    // For the sake of this example, let's just reset to the initial data.
    var something = await getFriends();
    console.log(something);
    setFriendsList(something.data);
    //setFriends(something.data);

  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Friends List
      </Typography>
      <Button onClick={refreshFriendsList} variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
        Refresh
      </Button>
      <List>
        {friendsList.map((friend, id) => (
          <ListItem key={id}>
            <ListItemText primary={friend.email} primaryTypographyProps={{ color: 'black' }} />
            <ListItemText primary={friend.friendcode} primaryTypographyProps={{ color: 'black' }} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default FriendsListPage;

