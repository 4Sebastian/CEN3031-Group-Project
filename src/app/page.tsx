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

      <Stack direction="column" sx={{ width: 1, height: 1, justifyContent: 'flex-start' }}>
        {/* Title Stack */}
        <Stack direction="row" sx={{ height: 'min-content', justifyContent: 'space-between', padding: 3 }}>
          <Title />
          <UserIcon />
        </Stack>

        {/* FriendsList Stack */}
        <Stack direction="row" sx={{ height: 1, justifyContent: 'space-between', padding: 3 }}>
          <FriendsList />
          <GroupsList />
          <PuckDial />
        </Stack>
      </Stack>

    </Box>
  );
}
