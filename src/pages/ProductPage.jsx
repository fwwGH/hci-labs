import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import PageHeader from '../components/common/PageHeader';
import Rating from '../components/common/Rating';
import ProductGrid from '../components/common/ProductGrid';
import EmptyState from '../components/common/EmptyState';
import Icon from '../components/Icon';
import { asset } from '../utils/asset';
import { formatPrice } from '../utils/format';
import { specEntries, UNIT_SUFFIX } from '../utils/specs';

const ProductPage = () => {
  const { id } = useParams();
  const { data } = useData();
  const { catalog, getProduct, favorites, compare, addToCart, toggleFavorite, toggleCompare, markViewed } = useShop();
  const actions = useShopActions();
  const [quantity, setQuantity] = useState(1);

  const product = getProduct(id);

  useEffect(() => {
    if (product) markViewed(product.id);
  }, [product, markViewed]);

  const category = useMemo(
    () => data.categories.find((item) => item.id === product?.categoryId),
    [data.categories, product],
  );

  const reviews = useMemo(
    () => data.reviews.filter((review) => String(review.productId) === String(id)),
    [data.reviews, id],
  );

  const related = useMemo(
    () =>
      product
        ? catalog.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4)
        : [],
    [catalog, product],
  );

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            title="Товар не найден"
            text={`Позиция с идентификатором ${id} отсутствует в каталоге.`}
            action={
              <Link className="btn btn-primary" to="/catalog">
                Вернуться в каталог
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  const isFavorite = favorites.some((item) => String(item) === String(product.id));
  const inCompare = compare.some((item) => String(item) === String(product.id));
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const specs = specEntries(product.specs);

  return (
    <>
      <PageHeader
        title={product.name}
        breadcrumbs={[
          { label: 'Каталог', to: '/catalog' },
          ...(category ? [{ label: category.name, to: `/catalog/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <section className="section section-product">
        <div className="container">
          <div className="product-layout">
            <div className="product-gallery">
              <img src={asset(product.image)} alt={product.name} width="520" height="390" />
              {discount > 0 && <span className="badge badge-sale product-gallery-badge">-{discount}%</span>}
            </div>

            <div className="product-info">
              <Rating value={product.rating} count={product.reviews} />

              <div className="product-chips">
                <span className="chip">Бренд: {product.brand}</span>
                <span className={`chip${product.inStock ? ' chip--success' : ' chip--danger'}`}>
                  {product.inStock ? 'В наличии' : 'Под заказ'}
                </span>
                {product.isHit && <span className="chip chip--accent">Хит продаж</span>}
                {product.isNew && <span className="chip">Новинка</span>}
              </div>

              <div className="product-price-block">
                <span className="product-price-big">{formatPrice(product.price)}</span>
                {product.oldPrice && <span className="product-price-old">{formatPrice(product.oldPrice)}</span>}
              </div>

              <div className="product-buy-row">
                <div className="quantity-input">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Меньше">
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                    aria-label="Количество"
                  />
                  <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Больше">
                    +
                  </button>
                </div>

                <button type="button" className="btn btn-primary" onClick={() => addToCart(product.id, quantity)}>
                  <Icon name="cart" size="sm" /> Добавить в корзину
                </button>

                <button
                  type="button"
                  className={`btn btn-outline${isFavorite ? ' btn-outline--active' : ''}`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Icon name="favorite" size="sm" /> {isFavorite ? 'В избранном' : 'В избранное'}
                </button>

                <button
                  type="button"
                  className={`btn btn-outline${inCompare ? ' btn-outline--active' : ''}`}
                  onClick={() => toggleCompare(product.id)}
                >
                  <Icon name="compare" size="sm" /> {inCompare ? 'В сравнении' : 'Сравнить'}
                </button>
              </div>

              <ul className="product-benefits">
                <li>Официальная гарантия производителя</li>
                <li>Доставка по России от 1 дня</li>
                <li>Возврат в течение 14 дней</li>
              </ul>
            </div>
          </div>

          <div className="product-columns">
            <div className="product-column">
              <h2 className="block-title">Характеристики</h2>
              {specs.length ? (
                <table className="spec-table">
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.key}>
                        <th>{spec.label}</th>
                        <td>
                          {spec.value}
                          {UNIT_SUFFIX[spec.key] ?? ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="muted">Характеристики не заполнены.</p>
              )}
            </div>

            <div className="product-column">
              <h2 className="block-title">Отзывы покупателей ({reviews.length})</h2>
              {reviews.length ? (
                <ul className="review-list">
                  {reviews.map((review) => (
                    <li className="review-item" key={review.id}>
                      <div className="review-head">
                        <strong>{review.author}</strong>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <Rating value={review.rating} showValue={false} />
                      <p className="review-text">{review.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Пока никто не оставил отзыв об этом товаре.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-related">
          <div className="container">
            <h2 className="block-title">Похожие товары</h2>
            <ProductGrid
              products={related}
              favorites={actions.favorites}
              onToggleFavorite={actions.onToggleFavorite}
              onToggleCompare={actions.onToggleCompare}
              onAddToCart={actions.onAddToCart}
              onQuickView={actions.onQuickView}
            />
          </div>
        </section>
      )}

      {actions.quickView}
    </>
  );
};

export default ProductPage;
