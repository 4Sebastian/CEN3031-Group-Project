
"use client";
import { getEventAttendees, getPersonalEvents, getPrivateEvents, getPublicEvents } from '@/services/eventHandling';
import { isLoggedIn } from '@/services/userHandling';
import { Box, Stack, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, ButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateGroup from './createGroup';
import ViewGroup from './viewGroup';
import { HttpResponse } from '@/services/apiRequests';
import { useRouter } from 'next/router';
import { getFriendInfo } from '@/services/friendHandling';

export default function GroupsList(props: { shouldCheckUser: boolean, title?: string, moment?: Date, timeDirectionForward?: boolean, thinner?: boolean, noCreate?: boolean, friendMode?: boolean }) {
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [eventType, setEventType] = useState<'Public' | 'Private' | 'Personal'>('Public');
  const [selectedGroup, setSelectedGroup] = useState<string>();
  const [open, setOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState('Public');
  const router = useRouter();
  const { userid } = router.query;
  const [attendEvents, setAttendEvents] = useState<string[]>([]);

  const handleButtonClick = (value: 'Public' | 'Private' | 'Personal') => {
    setSelectedButton(value);
    setEventType(value);
    getEvents(value);
  };

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

  const handleData = (data: any, allAttendingEvents: string[]) => {
    if (props.moment) {
      var filteredData = data.filter((event: any) => {
        var date = new Date(event.datetime);
        if (props.friendMode) {
          if (!allAttendingEvents.includes(event.id)) {
            return false;
          }
        }
        if (props.moment) {
          if (props.timeDirectionForward) {
            return date.valueOf() >= props.moment?.valueOf();
          } else {
            return date.valueOf() <= props.moment?.valueOf();
          }
        }
      });
      return filteredData;
    } else {
      return data;
    }
  }

  async function handleFriend(data: any[]): Promise<string[]> {
    if (props.friendMode) {
      const response = await getFriendInfo(userid as string);
      console.log(response)
      if (response.status === 200) {
        var allEvents: string[] = [];
        for (const event of data) {
          var res = await getEventAttendees(event.id);
          if (res.status === 200) {
            for (const attendee of res.data) {
              if (attendee.friendcode == response.data.friendcode) {
                allEvents.push(event.id as string);
              }
            }
          }
        }
        console.log(allEvents)
        setAttendEvents(allEvents);
        return allEvents;
      }
    }
    return [];
  }

  async function getEvents(eType: string = 'None') {
    if (isLoggedIn()) {
      var response: HttpResponse = { data: [], status: 500, statusText: 'Internal Server Error' };
      switch (eType == 'None' ? eventType : eType) {
        case 'Public':
          response = await getPublicEvents();
          break;
        case 'Private':
          response = await getPrivateEvents();
          break;
        case 'Personal':
          response = await getPersonalEvents();
          break;
      }
      console.log(response)
      if (response.status === 200) {
        var allAttendingEvents = await handleFriend(response.data);
        var data = handleData(response.data, allAttendingEvents);
        setEventsData(data);
      } else {
        setEventsData([]);
      }
    } else {
      setEventsData([]);
    }
  }

  useEffect(() => {
    getEvents();
  }, [props.shouldCheckUser]);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("StartCreateEvent", () => {
        handleOpen();
      });
    }
  }, [])

  return (
    <Stack sx={{
      width: (props.thinner ? 0.33 : 0.65),
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
        <Stack direction={props.thinner ? "column" : "row"} justifyContent="space-between" alignItems="center" sx={{ width: '100%', paddingBottom: 2 }}>
          <Typography variant="h5" color="black" justifyContent="center" alignItems="center">
            {props.title ? props.title : "Events List"}
          </Typography>
          <ButtonGroup color="primary" aria-label="button group" sx={{ backgroundColor: 'white' }}>
            <Button
              variant={selectedButton === 'Public' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('Public')}
            >
              Public
            </Button>
            <Button
              variant={selectedButton === 'Private' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('Private')}
            >
              Private
            </Button>
            {!props.friendMode && <Button
              variant={selectedButton === 'Personal' ? 'contained' : 'outlined'}
              onClick={() => handleButtonClick('Personal')}
            >
              Personal
            </Button>}
          </ButtonGroup>

        </Stack>
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
      {!props.noCreate && <Box sx={{ padding: 2 }}>
        <Button variant="contained" onClick={handleOpen}>Create Event</Button>
      </Box>}
      <CreateGroup open={open} handleClose={handleClose} getEvents={getEvents} />
      <ViewGroup groupId={selectedGroup as string} open={groupOpen} handleClose={handleGroupClose} getEvents={getEvents} />
    </Stack>
  );
}
