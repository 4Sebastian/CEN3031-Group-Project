import Image from "next/image";
import styles from "./page.module.css";
import { Box, GlobalStyles, Stack, Typography } from '@mui/material'
import FriendsList from '@/components/friends';
import Title from '@/components/title';
import UserIcon from '@/components/userIcon'
import GroupsList from '@/components/groups'
import PuckDial from '@/components/puckdial'


export default function Home() {
  return (
    <Box sx={{ width: '100dvw', height: '100dvh', backgroundImage: "url('components/Ice_Hockey.jpeg')", backgroundSize: 'cover' }}>

      <Stack direction="column" justifyContent="space-between" alignItems="flex-end" sx={{ width: 1, padding: 3, height: 1 }}>
        {/* Title Stack */}
        <Stack direction="row" justifyContent="space-between" sx={{ width: 1, height: 'min-content', marginBottom: 2 }}>
          <Title />
          <UserIcon />
        </Stack>

        {/* FriendsList Stack */}
        <Stack direction="row" justifyContent="space-between" sx={{ width: 1, height: 1 }}>
          <FriendsList />
          <GroupsList />
          <PuckDial />
        </Stack>
      </Stack>

    </Box>
  );
}
