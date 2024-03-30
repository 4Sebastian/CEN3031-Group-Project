import { Avatar, Box, Stack, Typography } from '@mui/material';

export default function UserProfile(props:{ name: string, rink: string, skillLevel: string, imageUrl:string }) {
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
          {props.name}
        </Typography>
        <Typography variant="h4" color="black">
          Rink: {props.rink}
        </Typography>
        <Typography variant="h4" color="black">
          Skill Level: {props.skillLevel}
        </Typography>
      </Stack>
    </Box>
  );
}
