import { getInfo, isLoggedIn } from '@/services/userHandling';
import { Avatar, Box, Stack } from '@mui/material'
import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useState } from 'react';

export default function UserIcon(props: {userName: string ; onclick: any; imagePath: any; backgroundColor : any}) {
  // Extracting the first letter of the userName
  const [userImage, setUserImage] = useState(props.userName);
  let [loggedIn, setLoggedIn] = useState(false)
  const images = ['/components/Profile_Icons/formation_1862969.png', '/components/Profile_Icons/goal_1412940.png','/components/Profile_Icons/goalie_3294751.png',
    '/components/Profile_Icons/hockey_991032.png','/components/Profile_Icons/hockey_2510130.png','/components/Profile_Icons/hockey_5222537.png',
    '/components/Profile_Icons/hockey-player_2379114.png','/components/Profile_Icons/hockey-stick_3798795.png','/components/Profile_Icons/ice_13257450.png',
    '/components/Profile_Icons/ice-hockey_4357573.png','/components/Profile_Icons/ice-hockey_4357794.png','/components/Profile_Icons/ice-hockey_15184417.png',
    '/components/Profile_Icons/puck_4242141.png']

  useEffect(() => {
    // Update buttonString based on loggedIn prop
    const letter = props.userName?.charAt(0).toUpperCase();
    console.log(letter)
    setUserImage(letter)
  },[props.userName]);

  return (
      <Avatar
        alt="User Profile"
        src={props.imagePath}
        sx={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          cursor: 'pointer',
          filter: 'drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.5))',
          transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          bgcolor: props.backgroundColor
        }}
        onClick={props.onclick}
      >
      </Avatar>
  );
}