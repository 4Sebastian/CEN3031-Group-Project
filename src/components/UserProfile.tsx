import { getInfo, update } from '@/services/userHandling';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UserProfile(props: { name: string, rink: string, skillLevel: string, imageUrl: string, editButton: boolean, friendcode: string }) {
    const [open, setOpen] = useState(false);
    const [friendCodeDialogOpen, setFriendCodeDialogOpen] = useState(false);
    const router = useRouter();
    let defaultRink = props.rink === 'Not Set' ? '' : props.rink;
    let defaultSkill = props.skillLevel === 'Not Set' ? '' : props.skillLevel;
    const [editedAttributes, setEditedAttributes] = useState({
        username: props.name,
        homerink: defaultRink,
        skilllevel: defaultSkill
    });

    const [viewingAttributes, setViewingAttributes] = useState({
      username: props.name,
      homerink: props.rink,
      skilllevel: props.skillLevel
    });

    const handleEditClick = () => {
      setEditedAttributes(viewingAttributes);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>, attribute: string) => {
        const { value } = event.target;
        setEditedAttributes({ ...editedAttributes, [attribute]: value as string });
    };

    const handleViewFriendCodeClick = () => {
        setFriendCodeDialogOpen(true);
    };

    const handleCloseFriendCodeDialog = () => {
        setFriendCodeDialogOpen(false);
    };

  const handleCopyToClipboard = () => {
      // Copy the friend code to clipboard
      navigator.clipboard.writeText(props.friendcode);
  };

    const handleSave = async (e: any) => {
      e.preventDefault()
      let passingAttributes: { [key: string]: string | undefined } = {
        username: editedAttributes.username,
        homerink: editedAttributes.homerink,
        skilllevel: editedAttributes.skilllevel
      };
      
      // Remove properties with null values
      for (let key in passingAttributes) {
        console.log(passingAttributes[key])
          if (passingAttributes[key] === null || passingAttributes[key] === "" || passingAttributes[key] === "Not Set") {
              delete passingAttributes[key];
          }
      }
      var something = await update(passingAttributes);
      console.log(something)
      if(something.status == 200){
        setViewingAttributes(editedAttributes)
      }
      // Perform save operation with editedAttributes
      console.log("Edited Attributes:", passingAttributes);
      // Close the modal
      setOpen(false);
      if(passingAttributes.username != props.name){
        console.log("I am here")
        router.push(`/users/${passingAttributes.username}`)
      }
        
    };

    useEffect(() => {
      console.log("hello")
      setEditedAttributes({
        username: props.name,
        homerink: props.rink,
        skilllevel: props.skillLevel
    })
    setViewingAttributes({
      username: props.name,
      homerink: props.rink,
      skilllevel: props.skillLevel
    })
    }, [props.name, props.rink, props.skillLevel]);

    return (
        <Box sx={{
            width: 0.3,
            height: '80vh', // Adjust the height as needed
            backgroundColor: 'rgba(128, 128, 128, 0.75)',
            borderRadius: '15px',
            transition: 'box-shadow 0.1s ease',
            '&:hover': {
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            },
        }}
        >
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ padding: 2 }}>
                <Avatar alt={props.name} src={props.imageUrl} sx={{ width: 240, height: 240, borderRadius: '15px' }} />
                <Typography variant="h3" color="black">
                    {viewingAttributes.username}
                </Typography>
                <Typography variant="h4" color="black">
                    Rink: {viewingAttributes.homerink}
                </Typography>
                <Typography variant="h4" color="black">
                    Skill Level: {viewingAttributes.skilllevel}
                </Typography>
                {props.editButton && (
                    <><Button variant="contained" color="primary" onClick={handleEditClick}>
                      Edit
                    </Button><Button variant="contained" color="primary" onClick={handleViewFriendCodeClick}>
                        View Friend Code
                    </Button></>
                )}
            </Stack>

            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSave}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="username"
                      label="Username"
                      fullWidth
                      value={editedAttributes.username}
                      onChange={(event) => handleChange(event, 'username')}
                  />
                  <TextField
                      autoFocus
                      margin="dense"
                      id="rink"
                      label="Home Rink"
                      fullWidth
                      value={editedAttributes.homerink}
                      onChange={(event) => handleChange(event, 'homerink')}
                  />
                  <TextField
                      select
                      label="Skill Level"
                      fullWidth
                      margin="dense"
                      id="skillLevel"
                      value={editedAttributes.skilllevel}
                      onChange={(event) => handleChange(event, 'skilllevel')}
                  >
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
                  </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog open={friendCodeDialogOpen} onClose={handleCloseFriendCodeDialog}>
                <DialogTitle>Friend Code</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        {/* Display the friend code here */}
                        {/* Replace 'FriendCodeHere' with the actual friend code */}
                        Friend Code: {props.friendcode}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseFriendCodeDialog}>Close</Button>
                    <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}