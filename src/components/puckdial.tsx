import React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PrintIcon from '@mui/icons-material/Print';
import EventIcon from '@mui/icons-material/Event';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';

// Your image URLs
const customIconUrl = "components/hockey-puck.png";
const customOpenIconUrl = "components/Hockey_Net.webp";

const actions = [
  { icon: <EventIcon />, name: 'Create Event'},
  { icon: <SportsHockeyIcon />, name: 'Join Event'},
  { icon: <AccountBoxIcon />, name: 'View Profile'},
  { icon: <PersonAddIcon />, name: 'Add Friend'},
];

export default function PuckDial() {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon
        icon={<img src={customIconUrl} alt="Custom Icon" style={{ width: '100%', height: '100%', transition: 'transform 0.3s ease' }} />}
        openIcon={<img src={customOpenIconUrl} alt="Custom Open Icon" style={{ width: '100%', height: '100%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
      />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
