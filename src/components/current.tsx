import { Box, Stack, Typography, Button } from '@mui/material';
import GroupsList from './group/groups';

const eventsData = [
  'Event 1A',
  'Event 1B',
  'Event 1C',
  'Event 2A',
  'Event 2B',
  'Event 2C',
];

export default function CurrentGroupsList() {
  const currentDate: Date = new Date(Date.now());
  return (
    <GroupsList shouldCheckUser={false} title="Current Events" timeDirectionForward={true} moment={currentDate} thinner={true} noCreate={true} friendMode={true} />
  )
}
