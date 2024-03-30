import { useRouter } from 'next/router';
import { Box, Container, CssBaseline, Paper, Typography, Stack, Button, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import MembersList from '@/components/members';
import React, { useState } from 'react';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0',
      paper: '#f4f4f4',
    },
  },
});

const CreateEvent = () => {
  const router = useRouter();
  const [selectedDate, handleDateChange] = React.useState(new Date());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        bgcolor="background.default"
        alignItems="center"
        pt="100px"
        pl="0px"
        pr="0px"
      >
        <Paper elevation={3} square={false} style={{ width: '1000px', flexGrow: 1 }}>
          <Container maxWidth="md" style={{ height: '100%' }}>
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography style={{
                    position: 'absolute',
                    top: '130px',
                    left: '50%',
                    transform: 'translateX(-130px)',
                    fontSize: '30pt'
                }}>
                    Create Event
                </Typography>
              <Box
                top="50px"
                width="1000px"
                height="640px"
                bgcolor="#e8e8e8"
                position="relative"
                mt="60px"
              >
                <Stack spacing={3} sx={{ width: '80%', margin: '0 auto', paddingTop: '50px' }}>
                  <TextField label="Event Name" variant="outlined" fullWidth />
                  <TextField label="Date & Time" variant="outlined" fullWidth />
                  <TextField label="Location" variant="outlined" fullWidth />
                  <TextField label="Skill Level" variant="outlined" fullWidth />
                  <TextField label="Expected Entry Fee" variant="outlined" fullWidth />
                </Stack>
              </Box>

              <Button variant="contained" color="primary">
                Create
              </Button>
            </Box>
          </Container>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default CreateEvent;
