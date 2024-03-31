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
import GroupsList from '@/components/group/groups';
import PuckDial from '@/components/puckdial';
import CurrentGroupsList from '@/components/current';
import PastGroupsList from '@/components/past';
import UserProfile from '@/components/UserProfile';
import { getFriendInfo } from '@/services/friendHandling';


const NormColor1 = '#C83E4D';
const darkenedColor50Percent1 = darken('#2534c9', 0.4);
const NormColor2 = '#F24333';
const darkenedColor50Percent2 = darken('#5ADBFF', 0.5);

const bannerImageUrl = '/components/night.png';
const profileImageUrl = 'https://osu.ppy.sh/assets/images/avatar-guest.8a2df920.png';


const UserPage = () => {
  const router = useRouter();
  const { userid } = router.query;
  const[isLoggedInUser, setLoggedInUser] = useState(true);
  const[skilllevel, setSkillLevel] = useState('')
  const[iceRink, setIceRink] = useState('')
  const[currentUser, setCurrentUser] = useState('')
  const [userInfo, setUserInfo] = useState<any>({
    username: 'User'
  });

  const handleUserIconClick = () => {
    console.log('thing')
    router.push('/');
  };

  function setAttributes(attributes: any){
    console.log(attributes)
    setSkillLevel(attributes.skilllevel ? attributes.skilllevel : "Not Set")
    setIceRink(attributes.homerink ? attributes.homerink : "Not Set")
  }

  useEffect(() => {
    // Fetch user information when the component mounts
    console.log('hello there')
    async function fetchUserInfo() {
      try {
        const response = await getInfo();
        setCurrentUser(response.data.username)
        if(response.data.username == userid){
          setLoggedInUser(true)
          if (response.status === 200) {
            setAttributes(response.data)
            setUserInfo(response.data);
            console.log(userInfo.username);
            console.log(userid)
          } else {
            console.error('Failed to fetch user information');
          }
        }
        else{
          setLoggedInUser(false)
          console.log(userid)
          if (typeof userid === 'string') {
            const response = await getFriendInfo(userid);
            setUserInfo(response.data);
            setAttributes(response.data)
            console.log(response)
            console.log(userInfo.username);
          }
          else{
            console.error('User ID is not a valid string:', userid);
          }
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
            zindex: 1,
            background: `linear-gradient(to top, ${NormColor2}, ${darkenedColor50Percent2})`,
            clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 0 100%)',

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
              zindex: 1,
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
            <UserIcon onclick={handleUserIconClick} userName={currentUser} />
          </Stack>
          {/* FriendsList Stack */}
          <Stack direction="row" sx={{ height: 1, justifyContent: 'space-between', padding: 3, position: 'relative', zIndex: 2 }}>
            <UserProfile rink={iceRink} name={userid as string} skillLevel={skilllevel} imageUrl={profileImageUrl} editButton = {isLoggedInUser} friendcode = {userInfo.friendcode}/>
            <CurrentGroupsList />
            <PastGroupsList />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserPage;
