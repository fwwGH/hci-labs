import { Link } from 'react-router-dom';
import Modal from './Modal';
import Rating from './Rating';
import Icon from '../Icon';
import { asset } from '../../utils/asset';
import { formatPrice } from '../../utils/format';
import { specEntries } from '../../utils/specs';

/**
 * Модальное окно с подробной информацией об объекте предметной области.
 * Открывается из карточки товара на любой странице приложения.
 */
const QuickViewModal = ({ product, open, onClose, onAddToCart, onToggleFavorite, isFavorite }) => {
  if (!product) return null;

  const { id, name, price, oldPrice, rating, reviews, inStock, brand, image, specs } = product;
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <Modal open={open} onClose={onClose} title="Быстрый просмотр" size="lg">
      <div className="quick-view">
        <div className="quick-view-media">
          <img src={asset(image)} alt={name} width="320" height="240" />
          {discount > 0 && <span className="badge badge-sale quick-view-badge">-{discount}%</span>}
        </div>

        <div className="quick-view-info">
          <h3 className="quick-view-name">{name}</h3>
          <Rating value={rating} count={reviews} />
          <div className="quick-view-meta">
            <span className="chip">Бренд: {brand}</span>
            <span className={`chip${inStock ? ' chip--success' : ' chip--danger'}`}>
              {inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </div>

          <div className="quick-view-prices">
            <span className="quick-view-price">{formatPrice(price)}</span>
            {oldPrice && <span className="quick-view-old">{formatPrice(oldPrice)}</span>}
          </div>

          <dl className="spec-list">
            {specEntries(specs).slice(0, 8).map((spec) => (
              <div className="spec-list-row" key={spec.key}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="quick-view-actions">
            <button type="button" className="btn btn-primary" onClick={() => onAddToCart(id)}>
              <Icon name="cart" size="sm" /> В корзину
            </button>
            <button
              type="button"
              className={`btn btn-outline${isFavorite ? ' btn-outline--active' : ''}`}
              onClick={() => onToggleFavorite(id)}
            >
              <Icon name="favorite" size="sm" /> {isFavorite ? 'В избранном' : 'В избранное'}
            </button>
            <Link className="btn btn-yellow" to={`/product/${id}`} onClick={onClose}>
              Открыть страницу товара
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
