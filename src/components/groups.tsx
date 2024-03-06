import { Box, Stack } from '@mui/material'


export default function GroupdList() {
    return( <Box
        sx={{
          width: 0.65,
          height: 1, // Adjust the height as needed
          backgroundColor: 'rgba(128, 128, 128, 0.75)', // Red color with 50% opacit
          zIndex: 999, // Set a higher zIndex to ensure it's on top of other elements
          borderRadius: '15px',
          transition: 'box-shadow 01s ease', // Adding transition for a smoother effect
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Box shadow on hover
          },
        }}
      />
    )
}