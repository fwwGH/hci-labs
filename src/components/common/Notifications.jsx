import { Alert, Snackbar } from '@mui/material';
import { useShop } from '../../context/ShopContext';

/** Всплывающие уведомления о действиях пользователя (Snackbar + Alert). */
const Notifications = () => {
  const { notifications, closeNotification } = useShop();
  const current = notifications[notifications.length - 1];

  const handleClose = () => {
    if (current) closeNotification(current.id);
  };

  return (
    <Snackbar
      open={Boolean(current)}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity={current?.severity ?? 'success'}
        variant="filled"
        onClose={handleClose}
        sx={{ minWidth: 280 }}
      >
        {current?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notifications;
