import { getInfo, isLoggedIn } from '@/services/userHandling';
import { Avatar, Box, Stack } from '@mui/material'
import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useState } from 'react';

export default function UserIcon(props: {userName: string ; onclick: any}) {
  // Extracting the first letter of the userName
  const [userImage, setUserImage] = useState(props.userName);
  let [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // Update buttonString based on loggedIn prop
    const letter = props.userName?.charAt(0).toUpperCase();
    console.log(props.userName)
    setUserImage(letter)
  },[props.userName]);

  return (
      <Avatar
        alt="User Profile"
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
        }}
        onClick={props.onclick}
      >
          {userImage}
      </Avatar>
  );
}