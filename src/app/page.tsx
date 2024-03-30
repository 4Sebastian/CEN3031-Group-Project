"use client"
import CreateEventPage from '@/components/event/createEvent';
import DeleteEventPage from '@/components/event/deleteEvent';
import EventInfoPage from '@/components/event/getEventInfo';
import PrivateEventListPage from '@/components/event/getPrivateEvents';
import PublicEventListPage from '@/components/event/getPublicEvents';
import AttendEventPage from '@/components/event/joinEvent';
import LeaveEventPage from '@/components/event/leaveEvent';
import AddFriendPage from '@/components/friend/addFriend';
import FriendsListPage from '@/components/friend/getFriends';
import RemoveFriendPage from '@/components/friend/removeFriend';
import ChangePasswordPage from '@/components/user/changePassword';
import CreateUserPage from '@/components/user/create';
import DeleteUserPage from '@/components/user/delete';
import { LoginPage } from '@/components/user/login';
import LogoutPage from '@/components/user/logout';
import { Stack, ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Stack sx={{ width: '100vw', height: '100vh', backgroundColor: 'tan', overflowY: 'scroll' }}>
        <LoginPage />
        <CreateUserPage />
        <DeleteUserPage />
        <LogoutPage />
        <ChangePasswordPage />
        <FriendsListPage />
        <AddFriendPage />
        <RemoveFriendPage />
        <CreateEventPage />
        <PublicEventListPage />
        <PrivateEventListPage />
        <EventInfoPage />
        <DeleteEventPage />
        <AttendEventPage />
        <LeaveEventPage />
      </Stack>
    </ThemeProvider>
  );
}
