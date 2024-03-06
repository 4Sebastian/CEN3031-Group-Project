import { Box, Stack, Typography, makeStyles } from '@mui/material'

import React from 'react';

export default function Title() {
    return(
        <Typography
        sx={{
          fontFamily: 'sans-serif', // Change the font family to your preference
          fontSize: 36,
          fontWeight: 'bold',
          color: 'black',
          transition: 'transform 0.3s ease', // Adding a transition for smoother animation
          '&:hover': {
            transform: 'scale(1.1)', // Scale the text on hover
          },
        }}
      >
        Hockey-n-Go
      </Typography>
    )
}