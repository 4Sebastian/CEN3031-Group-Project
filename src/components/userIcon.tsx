import { Avatar, Box, Stack } from '@mui/material'

export default function UserIcon() {
    return (
        <Avatar
          alt="User Profile"
          src={"components/White_British_Shorthair.png"} // Pass the URL of the user's profile image
          sx={{
            width: 60, // Set the desired size
            height: 60, // Set the desired size
            borderRadius: '50%', // Set borderRadius to 50% to create a circle
          }}
        />
    )
}