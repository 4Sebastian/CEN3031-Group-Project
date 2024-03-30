
"use client"

import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { getPrivateEvents } from '@/services/eventHandling';

const PrivateEventListPage = () => {
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrivateEvents();
  }, []);

  const fetchPrivateEvents = async () => {
    setLoading(true);
    try {
      var data: any[] = [];
      var something = await getPrivateEvents();
      console.log(something)
      if (something.status == 200) {
        data = something.data
      }
      setEvents(data);
    } catch (error) {
      console.error('Error fetching private events:', error);
    } finally {
      setLoading(false);
    }
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
    <Container maxWidth="md" sx={{ mt: 8, backgroundColor: "white", padding: 4 }}>
      <Typography color="black" variant="h4" align="center" gutterBottom>
        Private Event List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={fetchPrivateEvents}
        disabled={loading}
        fullWidth
        sx={{ mb: 2 }}
      >
        {loading ? 'Refreshing...' : 'Refresh'}
      </Button>
      {events.length > 0 ? (
        <List>
          {events.map((event: any) => (
            <ListItem key={event.id}>
              <ListItemText
                primary={`Event ID: ${event.id}`}
                secondary={`Creator: ${event.creator}, Date: ${formatDateTime(event.datetime)}, Skill Level: ${event.recommendedskilllevel}, Location: ${event.location}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="black" variant="body1" align="center">
          No private events available.
        </Typography>
      )}
    </Container>
  );
}

export default PrivateEventListPage;

