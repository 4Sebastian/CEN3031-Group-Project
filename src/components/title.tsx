import { Typography } from '@mui/material';

export default function Title() {
  return (
    <Typography
      sx={{
        fontFamily: 'sans-serif',
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black',
        transition: 'transform 0.3s ease, color 0.3s ease', // Adding color transition
        '&:hover': {
          transform: 'scale(1.1)',
          color: 'blue', // Change to the desired color
        },
      }}
    >
      Hockey-n-Go
    </Typography>
  );
}
