import Modal from './Modal';

/** Модальное окно подтверждения опасного действия (например, удаления товара). */
const ConfirmDialog = ({ open, title = 'Подтвердите действие', text, confirmText = 'Удалить', onConfirm, onCancel }) => (
  <Modal
    open={open}
    title={title}
    onClose={onCancel}
    size="sm"
    footer={
      <>
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Отмена
        </button>
        <button type="button" className="btn btn-primary btn-danger" onClick={onConfirm}>
          {confirmText}
        </button>
      </>
    }
  >
    <p className="confirm-text">{text}</p>
  </Modal>
);

export default ConfirmDialog;
