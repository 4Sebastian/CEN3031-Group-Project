"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Box, GlobalStyles, Stack, Typography, darken } from '@mui/material'
import FriendsList from '@/components/friends';
import Title from '@/components/title';
import UserIcon from '@/components/userIcon';
import GroupsList from '@/components/groups';
import PuckDial from '@/components/puckdial';

import ChangePasswordPage from '@/components/user/changePassword';
import CreateUserPage from '@/components/user/create';
import DeleteUserPage from '@/components/user/delete';
import { LoginPage } from '@/components/user/login';
import LogoutPage from '@/components/user/logout';

const NormColor1 = '#2534c9'
const darkenedColor50Percent1 = darken('#2534c9', 0.4);
const NormColor2 = '#6CC9E2'
const darkenedColor50Percent2 = darken('#5ADBFF', 0.5);

export default function Home() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
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
          clipPath: 'polygon(0 0, 100% 0, 40% 100%, 0% 100%)',
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
          <UserIcon />
        </Stack>

        {/* FriendsList Stack */}
        <Stack direction="row" sx={{ height: 1, justifyContent: 'space-between', padding: 3, position: 'relative', zIndex: 2 }}>
          <FriendsList />
          <GroupsList />
          <PuckDial />
        </Stack>
      </Stack>
    </Box>
  );
}
