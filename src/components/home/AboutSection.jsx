import { Container, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/** Блок «О компании»: текст и цели из JSON-файла site.json. */
const AboutSection = ({ title, text, goalsIntro, goals }) => (
  <Container maxWidth="lg" sx={{ mt: 5 }}>
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
        {text}
      </Typography>
      <Typography sx={{ mb: 1, fontWeight: 600 }}>{goalsIntro}</Typography>
      <List dense>
        {goals.map((goal) => (
          <ListItem key={goal} disableGutters>
            <ListItemIcon sx={{ minWidth: 34 }}>
              <CheckCircleIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={goal} primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
        ))}
      </List>
    </Paper>
  </Container>
);

export default AboutSection;
