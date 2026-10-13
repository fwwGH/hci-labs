import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useShop } from '../../context/ShopContext';

/** Подвал: контакты, навигация, подписка. Собран из компонентов Material UI. */
const AppFooter = ({ organization, navigation }) => {
  const { notify } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      notify('Введите корректный e-mail для подписки', 'warning');
      return;
    }
    notify(`Подписка оформлена: ${email}`);
    setEmail('');
  };

  const column = (title, items) => (
    <Grid item xs={12} sm={6} md={2}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <List dense disablePadding>
        {items.map((item) => (
          <ListItem key={item} disableGutters sx={{ py: 0.25 }}>
            <MuiLink
              component={RouterLink}
              to="/catalog"
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              {item}
            </MuiLink>
          </ListItem>
        ))}
      </List>
    </Grid>
  );

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider', mt: 4 }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main', mb: 1 }}>
              TELE-OPTICS
            </Typography>
            <Stack spacing={1} sx={{ color: 'text.secondary' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <PlaceIcon fontSize="small" />
                <Typography variant="body2">{organization.address}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon fontSize="small" />
                <MuiLink href={organization.phoneHref} underline="hover" variant="body2">
                  {organization.phone}
                </MuiLink>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon fontSize="small" />
                <MuiLink href={`mailto:${organization.email}`} underline="hover" variant="body2">
                  {organization.email}
                </MuiLink>
              </Stack>
              <Typography variant="body2">{organization.schedule}</Typography>
            </Stack>

            <Box component="form" onSubmit={handleSubscribe} sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                label="E-mail для новостей"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={{ maxWidth: 240 }}
              />
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Подписаться
              </Button>
            </Box>
          </Grid>

          {column('Каталог', navigation.footerCatalog.slice(0, 6))}
          {column('Информация', navigation.footerInfo)}
          {column('О компании', navigation.footerAbout)}

          <Grid item xs={12} md={2}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Мы на связи
            </Typography>
            <Stack direction="row" spacing={1}>
              {navigation.socials.map((social) => (
                <IconButton key={social.icon} size="small" aria-label={social.title} color="primary">
                  <SendIcon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
              {navigation.payments.map((payment) => (
                <Box
                  key={payment}
                  sx={{
                    px: 1,
                    py: 0.5,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    fontSize: 12,
                  }}
                >
                  {payment}
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={1}
        >
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} {organization.name}. Все права защищены.
          </Typography>
          <Stack direction="row" spacing={2}>
            <MuiLink component={RouterLink} to="/about" variant="caption" underline="hover">
              Политика конфиденциальности
            </MuiLink>
            <MuiLink component={RouterLink} to="/about" variant="caption" underline="hover">
              Условия соглашения
            </MuiLink>
            <MuiLink component={RouterLink} to="/catalog" variant="caption" underline="hover">
              Карта сайта
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default AppFooter;
