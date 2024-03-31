
"use client";
import { getPublicEvents } from '@/services/eventHandling';
import { isLoggedIn } from '@/services/userHandling';
import { Box, Stack, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateGroup from './createGroup';
import ViewGroup from './viewGroup';

export default function GroupsList() {
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>();
  const [open, setOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);

  const handleGroupOpen = (id: string | undefined) => {
    if (id !== undefined) {
      setSelectedGroup(id);
      setGroupOpen(true);
    }
    if (id === undefined && selectedGroup) {
      setGroupOpen(true);
    }
  };

  const handleGroupClose = () => {
    setGroupOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function getEvents() {
    if (isLoggedIn()) {
      const response = await getPublicEvents();
      console.log(response)
      setEventsData(response.data);
    }
  }

  useState(() => getEvents())// getEvents()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("StartCreateEvent", (event) => {
        handleOpen();
      });
    }
  }, [])

  return (
    <Stack sx={{
      width: 0.65,
      height: 1, // Adjust the height as needed
      justifyContent: 'space-between',
      backgroundColor: 'rgba(128, 128, 128, 0.75)',
      borderRadius: '15px',
      transition: 'box-shadow 0.1s ease',
      '&:hover': {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      },
    }}
    >
      <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ padding: 2 }}>
        <Typography variant="h5" color="black" sx={{ marginBottom: 2 }}>
          Events List
        </Typography>
        {eventsData.map((event, index) => (
          <Box key={index} sx={{
            backgroundColor: 'lightblue',
            borderRadius: '8px',
            width: 0.95,
            padding: '12px',
            marginBottom: '16px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
            },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <Typography color="black" variant="h6">{event.name}</Typography>
            <Button variant="contained" color="primary" onClick={() => { handleGroupOpen(event.id); }}>
              View
            </Button>
          </Box>
        ))}
      </Stack>
      <Box sx={{ padding: 2 }}>
        <Button variant="contained" onClick={handleOpen}>Create Event</Button>
      </Box>
      <CreateGroup open={open} handleClose={handleClose} getEvents={getEvents} />
      <ViewGroup groupId={selectedGroup as string} open={groupOpen} handleClose={handleGroupClose} getEvents={getEvents} />
    </Stack>
  );
}
