import { useShop } from '../../context/ShopContext';

/** Всплывающие уведомления о действиях пользователя (добавление, удаление, правка). */
const ToastStack = () => {
  const { notifications, closeNotification } = useShop();

  if (!notifications.length) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {notifications.map((notification) => (
        <div className={`toast toast--${notification.severity}`} key={notification.id}>
          <span className="toast-message">{notification.message}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => closeNotification(notification.id)}
            aria-label="Закрыть уведомление"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
