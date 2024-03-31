
import { createEvent, deleteEvent, getEventInfo } from '@/services/eventHandling';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const ViewGroup = (props: { groupId: string, open: boolean, handleClose: () => void, getEvents: () => void }) => {
  const [group, setGroup] = useState<any>({});

  async function getGroup() {
    var response = await getEventInfo(props.groupId)
    if (response.status == 200) {
      setGroup(response.data)
    }
    console.log(response)
  }

  async function handleDelete() {
    var response = await deleteEvent(props.groupId);
    if (response.status == 200) {
      props.getEvents();
      props.handleClose();
    }
  }
  useEffect(() => {
    getGroup();
  }, [props.groupId])

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Paper>
        <Stack>
          <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
            <Typography variant="h5" gutterBottom>
              Event ID: {group.id}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Name: {group.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: {group.location}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Recommended Skill Level: {group.recommendedskilllevel}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Date & Time: {group.datetime}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Visibility: {group.visibility}
            </Typography>
            <Button onClick={handleDelete}>Delete Event</Button>
          </Paper>
        </Stack>
      </Paper>
    </Dialog>
  );
}

export default ViewGroup;

