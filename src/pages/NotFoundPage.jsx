import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Stack } from '@mui/material';
import EmptyState from '../components/common/EmptyState';

const NotFoundPage = () => (
  <Container maxWidth="md">
    <EmptyState
      title="404 — страница не найдена"
      text="Возможно, адрес указан с ошибкой или страница была перемещена."
      action={
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button component={RouterLink} to="/" variant="contained">
            На главную
          </Button>
          <Button component={RouterLink} to="/catalog" variant="outlined">
            В каталог
          </Button>
        </Stack>
      }
    />
  </Container>
);

export default NotFoundPage;
