import { useRouter } from 'next/router';
import { Box, Container, CssBaseline, Paper, Typography, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import MembersList from '@/components/members';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0',
      paper: '#f4f4f4',
    },
  },
});


const JoinEvent = () => {
  const router = useRouter();
  const { eventid } = router.query;

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
                  transform: 'translateX(-230px)',
                  fontSize: '30pt'
              }}>
                  Pizza Party Skiing Event
              </Typography>
                
              <Box
                top="50px"
                width="1000px"
                height="640px"
                bgcolor="#e8e8e8"
                position="relative"
                mt="60px"
              >
              <Stack direction="row" sx={{ height: 1, justifyContent: 'space-between', padding: 3, position: 'relative', zIndex: 2 }}>
              <MembersList />
              </Stack>
              </Box>

            <Button
                variant="contained"
                color="primary"
            >
              Join
            </Button>
            </Box>
          </Container>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default JoinEvent;
