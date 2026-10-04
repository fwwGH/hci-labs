import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { asset } from '../utils/asset';
import { formatPrice } from '../utils/format';

const DELIVERY_THRESHOLD = 5000;
const DELIVERY_PRICE = 390;

/** Корзина: изменение количества, удаление позиций, итог и оформление заказа. */
const CartPage = () => {
  const { cartItems, cartTotal, cartCount, setQuantity, removeFromCart, clearCart, notify } = useShop();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const delivery = cartTotal > 0 && cartTotal < DELIVERY_THRESHOLD ? DELIVERY_PRICE : 0;
  const total = cartTotal + delivery;

  const handleCheckout = () => {
    notify(`Заказ на сумму ${formatPrice(total)} оформлен. Спасибо за покупку!`);
    clearCart();
  };

  return (
    <>
      <PageHeader
        title="Корзина"
        description={cartCount ? `Товаров в корзине: ${cartCount}` : 'Корзина пуста'}
        breadcrumbs={[{ label: 'Корзина' }]}
        actions={
          cartItems.length > 0 && (
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setConfirmOpen(true)}>
              Очистить корзину
            </button>
          )
        }
      />

      <section className="section">
        <div className="container">
          {cartItems.length === 0 ? (
            <EmptyState
              title="В корзине нет товаров"
              text="Добавьте приборы из каталога — они появятся здесь."
              action={
                <Link className="btn btn-primary" to="/catalog">
                  Перейти в каталог
                </Link>
              }
            />
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                {cartItems.map(({ product, quantity }) => (
                  <article className="cart-item" key={product.id}>
                    <Link to={`/product/${product.id}`} className="cart-item-image">
                      <img src={asset(product.image)} alt={product.name} width="120" height="90" />
                    </Link>

                    <div className="cart-item-info">
                      <Link to={`/product/${product.id}`} className="cart-item-name">
                        {product.name}
                      </Link>
                      <span className="cart-item-brand">{product.brand}</span>
                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Удалить
                      </button>
                    </div>

                    <div className="cart-item-price">{formatPrice(product.price)}</div>

                    <div className="quantity-input">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label="Уменьшить количество"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(event) => setQuantity(product.id, Number(event.target.value) || 1)}
                        aria-label={`Количество ${product.name}`}
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label="Увеличить количество"
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item-sum">{formatPrice(product.price * quantity)}</div>
                  </article>
                ))}
              </div>

              <aside className="cart-summary">
                <h2 className="block-title">Итого</h2>
                <dl className="summary-list">
                  <div className="summary-row">
                    <dt>Товары ({cartCount})</dt>
                    <dd>{formatPrice(cartTotal)}</dd>
                  </div>
                  <div className="summary-row">
                    <dt>Доставка</dt>
                    <dd>{delivery ? formatPrice(delivery) : 'Бесплатно'}</dd>
                  </div>
                  <div className="summary-row summary-row--total">
                    <dt>К оплате</dt>
                    <dd>{formatPrice(total)}</dd>
                  </div>
                </dl>
                <button type="button" className="btn btn-yellow btn-block" onClick={handleCheckout}>
                  Оформить заказ
                </button>
                <Link className="btn btn-outline btn-block" to="/catalog">
                  Продолжить покупки
                </Link>
                <p className="form-note">
                  Бесплатная доставка при заказе от {formatPrice(DELIVERY_THRESHOLD)}.
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>

      <ConfirmDialog
        open={confirmOpen}
        title="Очистить корзину?"
        text="Все товары будут удалены из корзины."
        confirmText="Очистить"
        onConfirm={() => {
          clearCart();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default CartPage;
