import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getInfo } from '@/services/userHandling';
import { darken } from '@mui/material/styles';

import "../globals.css";

// Component imports
import FriendsList from '@/components/friends';
import Title from '@/components/title';
import UserIcon from '@/components/userIcon';
import GroupsList from '@/components/groups';
import PuckDial from '@/components/puckdial';
import CurrentGroupsList from '@/components/current';
import PastGroupsList from '@/components/past';
import UserProfile from '@/components/UserProfile';


const NormColor1 = '#C83E4D';
const darkenedColor50Percent1 = darken('#2534c9', 0.4);
const NormColor2 = '#F24333';
const darkenedColor50Percent2 = darken('#5ADBFF', 0.5);

const bannerImageUrl = '/components/night.png';
const profileImageUrl = 'https://osu.ppy.sh/assets/images/avatar-guest.8a2df920.png';


const UserPage = () => {
  const router = useRouter();
  const { userid } = router.query;

  const [userInfo, setUserInfo] = useState({
    userName: '',
    rink: '',
    skillLevel: '',
    imageUrl: '',
  });

  const handleUserIconClick = () => {
      console.log('thing')
      router.push('/');
  };

  useEffect(() => {
    // Fetch user information when the component mounts
    async function fetchUserInfo() {
      try {
        const response = await getInfo();
        if (response.status === 200) {
          setUserInfo(response.data);
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error while fetching user information:', error);
      }
    }

    fetchUserInfo();
  }, [userid]);

  return (
    <Box
        sx={{
          width: '100vw',
          height: '100vh',
          position: 'relative'
        }}
      >
        {/* Left trapezoid with gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '80%',
            height: '100%',
            background: `linear-gradient(to bottom, ${NormColor1}, ${darkenedColor50Percent1})`,
            clipPath: 'polygon( 0, 100% 0, 40% 100%, 0% 100%)',
            zIndex: -1,
            
          }}
        />
  
        {/* Right trapezoid with gradient and shadow */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          filter: 'drop-shadow(-10px 0px 15px rgba(0, 0, 0, 0.5))',
          width: 1,
          height: 1,
        }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '70%',
              height: '100%',
              zindex : 1,
              background: `linear-gradient(to top, ${NormColor2}, ${darkenedColor50Percent2})`,
              clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 0 100%)',
              
            }}
          />
        </Box>
        {/* Content */}
        <Stack direction="column" sx={{ width: '100%', height: '100%', justifyContent: 'flex-start', position: 'relative', zIndex: 1 }}>
          {/* Title Stack */}
          <Stack direction="row" sx={{ height: 'min-content', justifyContent: 'space-between', padding: 3, position: 'relative', zIndex: 2 }}>
            <Title />
            <UserIcon onClick={handleUserIconClick} userName={userInfo.userName} />
          </Stack>
          {/* FriendsList Stack */}
          <Stack direction="row" sx={{ height: 1, justifyContent: 'space-between', padding: 3, position: 'relative', zIndex: 2 }}>
            <UserProfile rink= 'kendal ice arena' name = 'Nicholas Hartog' skillLevel='intermediate' imageUrl = {profileImageUrl}/>
            <CurrentGroupsList />
            <PastGroupsList/>
          </Stack>
        </Stack>
    </Box>
  );
};

export default UserPage;
