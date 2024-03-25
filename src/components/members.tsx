import { Box, Stack, Typography, Button } from '@mui/material';

const membersData = [
  'Jimena Hurst',
  'Gunner Kirby',
  'Leighton Wilkins',
  'Lydia Hebert',
  'Prince Christian',
  'Kason Archer',
];

export default function MembersList() {
  return (
    <Box sx={{
      width: 0.8,
      pl: 20,
      height: 1, // Adjust the height as needed
      backgroundColor: 'rgba(128, 128, 128, 0)',
      borderRadius: '15px',
      transition: 'box-shadow 0.1s ease',
      '&:hover': {
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
      },
    }}
    >
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
        <Typography variant="h5" color="black" sx={{ marginBottom: 2 }}>
          Members
        </Typography>
        {membersData.map((member, index) => (
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
            <Typography color="black" variant="h6">{member}</Typography>
            <Button variant="contained" color="primary">
              Profile
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
