import { Box, Stack, Typography, Button } from '@mui/material';
import { relative } from 'path';

const eventsData = [
  'Event 1A',
  'Event 1B',
  'Event 1C',
  'Event 2A',
  'Event 2B',
  'Event 2C',
  // Add more events as needed
];

export default function PastGroupsList() {
  return (
    <Box sx={{
      width: 0.33,
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
          Past Events
        </Typography>
        {eventsData.map((event, index) => (
          <Box key={index} sx={{
            backgroundColor: 'lightblue',
            borderRadius: '8px',
            width: '90%',
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
            <Typography color="black" variant="h6">{event}</Typography>
            <Button variant="contained" color="primary">
              Join
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
