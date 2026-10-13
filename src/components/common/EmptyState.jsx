/** Заглушка для пустых списков (корзина, избранное, результаты поиска). */
const EmptyState = ({ icon = '☹', title, text, action }) => (
  <div className="empty-state">
    <div className="empty-state-icon" aria-hidden="true">
      {icon}
    </div>
    <h3 className="empty-state-title">{title}</h3>
    {text && <p className="empty-state-text">{text}</p>}
    {action && <div className="empty-state-action">{action}</div>}
  </div>
);

export default EmptyState;
