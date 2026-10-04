import { Link } from 'react-router-dom';
import Icon from './Icon';
import Rating from './common/Rating';
import { asset } from '../utils/asset';
import { formatPrice } from '../utils/format';

/**
 * Карточка товара. Используется на главной странице, в каталоге,
 * в избранном, в сравнении и в блоке просмотренных товаров.
 */
const ProductCard = ({
  product,
  isFavorite,
  isSelected,
  selectable = false,
  onToggleFavorite,
  onToggleCompare,
  onAddToCart,
  onQuickView,
  onToggleSelect,
}) => {
  const { id, name, price, oldPrice, rating = 0, reviews = 0, inStock, isHit, isNew, image, brand } = product;
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <article className={`product-card${isSelected ? ' product-card--selected' : ''}`} role="listitem">
      {selectable && (
        <label className="product-select" title="Выбрать товар">
          <input
            type="checkbox"
            checked={Boolean(isSelected)}
            onChange={() => onToggleSelect?.(id)}
            aria-label={`Выбрать ${name}`}
          />
          <span className="product-select-box" aria-hidden="true" />
        </label>
      )}

      <div className="product-card-top">
        <div className="product-badges">
          {isHit && <span className="badge badge-hit">ХИТ</span>}
          {isNew && <span className="badge badge-new">Новинка</span>}
          {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
        </div>
        <div className={`product-stock${inStock ? '' : ' product-stock--out'}`}>
          <span className="product-stock-dot"></span>
          {inStock ? 'В наличии' : 'Нет в наличии'}
        </div>

        <Link className="product-image-wrap" to={`/product/${id}`} aria-label={name}>
          <img src={asset(image)} alt={name} loading="lazy" width="200" height="160" />
        </Link>

        <div className="product-actions-overlay">
          <button
            className={`product-action-icon fav-btn${isFavorite ? ' fav-btn--active' : ''}`}
            type="button"
            aria-label="В избранное"
            onClick={() => onToggleFavorite?.(id)}
          >
            <Icon name="favorite" size="sm" />
          </button>
          <button
            className="product-action-icon"
            type="button"
            aria-label="Сравнить"
            onClick={() => onToggleCompare?.(id)}
          >
            <Icon name="compare" size="sm" />
          </button>
          <button
            className="product-action-icon"
            type="button"
            aria-label="Быстрый просмотр"
            onClick={() => onQuickView?.(product)}
          >
            <Icon name="search" size="sm" />
          </button>
        </div>
      </div>

      <div className="product-card-body">
        <Rating value={rating} count={reviews} />
        <Link to={`/product/${id}`} className="product-name">
          {name}
        </Link>
        {brand && <div className="product-brand">{brand}</div>}

        <div className="product-price-row">
          <div className="product-prices">
            <span className="product-price">{formatPrice(price)}</span>
            {oldPrice && <span className="product-price-old">{formatPrice(oldPrice)}</span>}
          </div>
          <button
            className="add-to-cart-btn"
            type="button"
            aria-label="В корзину"
            onClick={() => onAddToCart?.(id)}
          >
            <Icon name="cart" size="sm" />
          </button>
        </div>

        {onQuickView && (
          <button type="button" className="btn btn-outline btn-quick-view" onClick={() => onQuickView(product)}>
            Подробнее
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
