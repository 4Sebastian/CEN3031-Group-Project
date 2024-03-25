import { useRouter } from 'next/router';
import { Box, Container, CssBaseline, Paper, Typography, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CurrentGroupsList from '@/components/current';
import PastGroupsList from '@/components/past';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0',
      paper: '#f4f4f4',
    },
  },
});

const skillStyle = {
    fontSize: '20px',
    position: 'absolute',
    top: '400px',
    left: '400px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    MozBackgroundClip: 'text',
    MozTextFillColor: 'transparent'
  };

const Profile = () => {
  const router = useRouter();
  const { userid } = router.query;

  // Placeholder URLs for images
  const bannerImageUrl = '/components/night.png';
  const profileImageUrl = 'https://osu.ppy.sh/assets/images/avatar-guest.8a2df920.png';

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
              <Box
                width="1000px"
                height="250px"
                bgcolor="#f5f5f5"
                position="relative"
                mb={2}
              >
                <img
                  src={bannerImageUrl}
                  alt="Banner"
                  style={{
                    width: '1000px',
                    height: '250px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '20%',
                    position: 'absolute',
                    top: '160px',
                    left: '100px',
                  }}
                />

                <img
                  src={"https://lh5.googleusercontent.com/proxy/S3A07xVwDYoA-K8OFpxSncpfs0EOcqHUcHmruMXgWFB_yd1ANWFnQd1cwWhMgdkUtLldVdFWvBe70ugdzmZBKxGQyILQTnY09yeL1WrWIcvT3J5V4A8MScjcHglUrgAowE4FWGBfXD1K=s0-d"}
                  alt="Profile"
                  style={{
                    width: '25px',
                    height: '25px',
                    borderRadius: '20%',
                    position: 'absolute',
                    top: '276px',
                    left: '730px',
                  }}
                />
              </Box>
                <Typography style={{
                    position: 'absolute',
                    top: '370px',
                    left: '50%',
                    transform: 'translateX(-230px)',
                    fontSize: '20pt'
                }}>
                    Nicholas Hartog
                </Typography>
                
                <Typography style={{
                    position: 'absolute',
                    top: '370px',
                    left: '50%',
                    transform: 'translateX(-10px)',
                    fontSize: '20pt',
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    MozBackgroundClip: 'text',
                    MozTextFillColor: 'transparent'
                }}>
                    Intermediate
                </Typography>
                <Typography style={{
                    position: 'absolute',
                    top: '375px',
                    left: '50%',
                    transform: 'translateX(260px)',
                    fontSize: '14pt'
                }}>
                    Skate Station Funworks
                </Typography>
              <Box
                width="1000px"
                height="640px"
                bgcolor="#e8e8e8"
                position="relative"
                mt="60px"
              >
              <Stack direction="row" sx={{ height: 1, justifyContent: 'space-between', padding: 3, position: 'relative', zIndex: 2 }}>
              <CurrentGroupsList />
              <PastGroupsList />
              </Stack>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
