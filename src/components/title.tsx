import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Title() {

  const router = useRouter();
  
  const handleTitle = () => {
    router.push('/');
  };

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
        },
      }}
      onClick={handleTitle}
    >
      Hockey-n-Go
    </Typography>
  );
}
