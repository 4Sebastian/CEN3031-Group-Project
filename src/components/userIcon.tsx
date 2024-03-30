import { Avatar, Box, Stack } from '@mui/material'
import { MouseEventHandler } from 'react';

export default function UserIcon(props: {onClick: () => void, userName: string}) {
  // Extracting the first letter of the userName
  const letter = props.userName.charAt(0).toUpperCase();

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
        onClick={props.onClick}
      >
          {letter}
      </Avatar>
  );
}