import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SendIcon from '@mui/icons-material/Send';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import PageHeader from '../components/common/PageHeader';

const EMPTY_FORM = { name: '', email: '', message: '' };

/** Контакты: реквизиты из JSON и форма обратной связи с валидацией. */
const ContactsPage = () => {
  const { data } = useData();
  const { notify } = useShop();
  const { organization } = data.site;
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const setField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Укажите имя';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Укажите корректный e-mail';
    if (form.message.trim().length < 10) next.message = 'Сообщение не короче 10 символов';
    setErrors(next);
    if (Object.keys(next).length) return;

    notify(`Спасибо, ${form.name}! Ответим на ${form.email} в течение дня.`);
    setForm(EMPTY_FORM);
  };

  const contacts = [
    { icon: <PlaceIcon />, value: organization.address },
    { icon: <PhoneIcon />, value: organization.phone, href: organization.phoneHref },
    { icon: <EmailIcon />, value: organization.email, href: `mailto:${organization.email}` },
    { icon: <ScheduleIcon />, value: organization.schedule },
  ];

  return (
    <>
      <PageHeader
        title="Контакты"
        description="Свяжитесь с нами удобным способом или заполните форму"
        breadcrumbs={[{ label: 'Контакты' }]}
      />

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h3" component="h3" sx={{ mb: 2 }}>
                {organization.name}
              </Typography>
              <List>
                {contacts.map((contact) => (
                  <ListItem key={contact.value} disableGutters>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.light' }}>{contact.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        contact.href ? (
                          <MuiLink href={contact.href} underline="hover">
                            {contact.value}
                          </MuiLink>
                        ) : (
                          contact.value
                        )
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h3" component="h3" sx={{ mt: 2, mb: 1 }}>
                Наши сотрудники
              </Typography>
              <List dense>
                {data.users.map((user) => (
                  <ListItem key={user.id} disableGutters>
                    <ListItemAvatar>
                      <Avatar>{user.name.slice(0, 1)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={`${user.email} · ${user.phone}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h3" component="h3" sx={{ mb: 2 }}>
                Написать нам
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="Имя *"
                    value={form.name}
                    onChange={setField('name')}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                  <TextField
                    label="E-mail *"
                    type="email"
                    value={form.email}
                    onChange={setField('email')}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />
                  <TextField
                    label="Сообщение *"
                    multiline
                    rows={5}
                    value={form.message}
                    onChange={setField('message')}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                  />
                  <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{ alignSelf: 'flex-start' }}>
                    Отправить сообщение
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactsPage;
