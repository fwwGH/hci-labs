import { Avatar, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ShieldIcon from '@mui/icons-material/Shield';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const ICONS = {
  delivery: <LocalShippingIcon />,
  'certificate-medal': <WorkspacePremiumIcon />,
  shield: <ShieldIcon />,
  'medal-prize-reward': <EmojiEventsIcon />,
};

/** Преимущества магазина: Paper + Avatar из Material UI. */
const FeatureList = ({ features }) => (
  <Container maxWidth="xl" sx={{ mt: 5 }}>
    <Grid container spacing={2}>
      {features.map((feature) => (
        <Grid item xs={12} sm={6} md={3} key={feature.title}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'primary.light' }}>{ICONS[feature.icon] ?? <ShieldIcon />}</Avatar>
              <Stack>
                <Typography variant="subtitle2">{feature.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default FeatureList;
