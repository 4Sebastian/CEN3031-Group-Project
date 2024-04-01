
import { createEvent } from '@/services/eventHandling';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

const CreateGroup = (props: { open: boolean, handleClose: () => void, getEvents: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    datetime: '',
    recommendedskilllevel: '',
    visibility: 'Public',
    location: '',
  });

  const handleChange = (event: any, field: string) => {
    const { value } = event.target;
    setFormData({ ...formData, [field]: value });
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    // Here you can perform validation on formData
    // For simplicity, I'm assuming all fields are required
    console.log(formData);
    if (
      formData.name &&
      formData.datetime &&
      formData.recommendedskilllevel &&
      formData.visibility &&
      formData.location
    ) {
      var response = await createEvent(formData);
      if (response.status == 200) {
        console.log(response)
        props.handleClose();
        props.getEvents();
      }
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={handleFormSubmit}>
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            required
            id="name"
            label="Name"
            type="textfield"
            fullWidth
            value={formData.name}
            onChange={(event) => handleChange(event, 'name')}
          />
          <TextField
            autoFocus
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            required
            id="datetime"
            label="Datetime"
            type="datetime-local"
            fullWidth
            value={formData.datetime}
            onChange={(event) => handleChange(event, 'datetime')}
          />
          <TextField
            select
            label="Recommended Skill Level"
            fullWidth
            margin="dense"
            required
            id="recommendedskilllevel"
            value={formData.recommendedskilllevel}
            onChange={(event) => handleChange(event, 'recommendedskilllevel')}
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>
          <TextField
            select
            label="Visibility"
            fullWidth
            margin="dense"
            required
            id="visibility"
            value={formData.visibility}
            onChange={(event) => handleChange(event, 'visibility')}
          >
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Private">Private</MenuItem>
          </TextField>
          <TextField
            label="Location"
            fullWidth
            margin="dense"
            required
            id="location"
            value={formData.location}
            onChange={(event) => handleChange(event, 'location')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreateGroup;

