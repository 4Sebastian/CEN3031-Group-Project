"use client"
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
      </Stack>
    </ThemeProvider>
  );
}
