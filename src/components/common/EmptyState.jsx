import { Avatar, Box, Stack, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

/** Заглушка для пустых списков и страницы 404. */
const EmptyState = ({ icon = <SearchOffIcon fontSize="large" />, title, text, action }) => (
  <Stack alignItems="center" spacing={2} sx={{ py: 8, textAlign: 'center' }}>
    <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.light' }}>{icon}</Avatar>
    <Typography variant="h2" component="h2">
      {title}
    </Typography>
    {text && (
      <Typography color="text.secondary" maxWidth={520}>
        {text}
      </Typography>
    )}
    {action && <Box>{action}</Box>}
  </Stack>
);

export default EmptyState;
