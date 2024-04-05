"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/router';
import { Avatar, Box, GlobalStyles, Stack, Typography, darken } from '@mui/material'
import FriendsList from '@/components/friends';
import Title from '@/components/title';
import UserIcon from '@/components/userIcon';
import GroupsList from '@/components/group/groups';
import PuckDial from '@/components/puckdial';
import LogButton from "@/components/logButton";

import ChangePasswordPage from '@/components/user/changePassword';
import CreateUserPage from '@/pages/createUser/[createUser]';
import DeleteUserPage from '@/components/user/delete';
import { LoginPage } from '@/components/user/login';
import LogoutPage from '@/components/user/logout';
import { getInfo, isLoggedIn } from "@/services/userHandling";
import { useState, useEffect } from "react";

import "./globals.css"


const NormColor1 = '#2534c9'
const darkenedColor50Percent1 = darken('#2534c9', 0.4);
const NormColor2 = '#6CC9E2'
const darkenedColor50Percent2 = darken('#5ADBFF', 0.5);

const images = ['/components/Profile_Icons/formation_1862969.png', '/components/Profile_Icons/goal_1412940.png','/components/Profile_Icons/goalie_3294751.png',
    '/components/Profile_Icons/hockey_991032.png','/components/Profile_Icons/hockey_2510130.png','/components/Profile_Icons/hockey_5222537.png',
    '/components/Profile_Icons/hockey-player_2379114.png','/components/Profile_Icons/hockey-stick_3798795.png','/components/Profile_Icons/ice_13257450.png',
    '/components/Profile_Icons/ice-hockey_4357573.png','/components/Profile_Icons/ice-hockey_4357794.png','/components/Profile_Icons/ice-hockey_15184417.png',
    '/components/Profile_Icons/puck_4242141.png']


export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [activeComponent, setActiveComponent] = useState('home');
  let [userCreated, setUserCreated] = useState(false);
  let [shouldCheckUser, setCheckUser] = useState(false);
  const[imagepath, setImagePath] = useState<any>();
  const[backgroundcolor, setBckgorundColor] = useState<any>();
  
  const currentDate: Date = new Date(Date.now());
  function checkUser() {
    setCheckUser(!shouldCheckUser);
  }

  const handleUserIconClick = () => {
    console.log('Clicked icon')
    if (userCreated) {
      console.log('User is created')
      router.push(`/users/${userName}`);
    }
  };

  const saveUserData = (data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("UserData", JSON.stringify(data));
    }
  }

  useEffect(() => {
    // Fetch user information when the component mounts
    async function fetchUserInfo() {
      try {
        if (isLoggedIn()) {
          const response = await getInfo();
          if (response.status === 200) {
            setUserName(response.data.username);
            setUserCreated(true);
            saveUserData(response.data);
            const hashCode = response.data.friendcode.split('').reduce((acc: any, char: string) => {
              return acc + char.charCodeAt(0);
            }, 0);
            const selectedImagePath = images[hashCode % images.length];
            const backgroundColor = '#' + hashCode.toString(16).slice(0, 6);
            setImagePath(selectedImagePath)
            setBckgorundColor(backgroundColor)
          } else {
            setUserCreated(false);
            console.error('Failed to fetch user information');
          }
        }
        else {
          console.log('logged out meow')
          setUserName('')
          setUserCreated(false)
          saveUserData({});
          setImagePath("")
            setBckgorundColor("")
          
        }
      } catch (error) {
        console.error('Error while fetching user information:', error);
      }
    }
    fetchUserInfo(); // Call the fetchUserInfo function
  }, [shouldCheckUser]);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'login':
        return <LoginPage />;
      case 'createUser':
        return <CreateUserPage />;
      case 'deleteUser':
        return <DeleteUserPage />;
      case 'logout':
        return <LogoutPage />;
      case 'changePassword':
        return <ChangePasswordPage />;
      case 'home':
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
                  zindex: 1,
                  background: `linear-gradient(to top, ${NormColor2}, ${darkenedColor50Percent2})`,
                  clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 0 100%)',

                }}
              />
            </Box>

            {/* Content */}
            <Stack direction="column" sx={{ width: '100%', height: '100%', justifyContent: 'flex-start', position: 'relative', zIndex: 1 }}>
              {/* Title Stack */}
              <Stack direction="row" alignItems="center" sx={{ height: 'min-content', justifyContent: 'space-between', padding: 3, position: 'relative', zIndex: 2 }}>
                <Title />
                <Stack direction="row" spacing={2}> {/* Adjust the spacing between LogButton and UserIcon */}
                  <LogButton loggedIn={userCreated} setCheckUser={setCheckUser} />
                  <UserIcon userName={userName} onclick={handleUserIconClick} imagePath={imagepath} backgroundColor={backgroundcolor}/>
                </Stack>
              </Stack>

              {/* FriendsList Stack */}
              <Stack direction="row" sx={{ height: 1, justifyContent: 'space-between', padding: 3, position: 'relative', zIndex: 2 }}>
                <FriendsList checkUser={userName} />
                <GroupsList shouldCheckUser={shouldCheckUser} timeDirectionForward={true} moment={currentDate} />
                <PuckDial />
              </Stack>
            </Stack>
          </Box>
        );
    }
  };
  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {renderActiveComponent()}
    </Box>
  );
}
