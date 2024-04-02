import { Box, Stack, Typography, Button } from '@mui/material';
import { relative } from 'path';
import GroupsList from './group/groups';

const eventsData = [
  'Event 1A',
  'Event 1B',
  'Event 1C',
  'Event 2A',
  'Event 2B',
  'Event 2C',
  // Add more events as needed
];

export default function PastGroupsList() {
  const currentDate: Date = new Date(Date.now());
  return (
    <GroupsList shouldCheckUser={false} title="Past Events" timeDirectionForward={false} moment={currentDate} thinner={true} noCreate={true} friendMode={true} />
  )
}
