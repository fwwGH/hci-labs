import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import PageHeader from '../components/common/PageHeader';
import ProductGrid from '../components/common/ProductGrid';
import EmptyState from '../components/common/EmptyState';

/** Ранее просмотренные товары (состояние пополняется при открытии страницы товара). */
const ViewedPage = () => {
  const { viewed, getProduct, clearViewed } = useShop();
  const actions = useShopActions();

  const products = viewed.map(getProduct).filter(Boolean);

  return (
    <>
      <PageHeader
        title="Просмотренные товары"
        description={`История просмотров: ${products.length} из 12`}
        breadcrumbs={[{ label: 'Просмотренные' }]}
        actions={
          products.length > 0 && (
            <button type="button" className="btn btn-outline btn-sm" onClick={clearViewed}>
              Очистить историю
            </button>
          )
        }
      />

      <section className="section">
        <div className="container">
          {products.length === 0 ? (
            <EmptyState
              title="История просмотров пуста"
              text="Откройте любой товар, и он появится в этом списке."
              action={
                <Link className="btn btn-primary" to="/catalog">
                  Перейти в каталог
                </Link>
              }
            />
          ) : (
            <ProductGrid
              products={products}
              favorites={actions.favorites}
              onToggleFavorite={actions.onToggleFavorite}
              onToggleCompare={actions.onToggleCompare}
              onAddToCart={actions.onAddToCart}
              onQuickView={actions.onQuickView}
            />
          )}
        </div>
      </section>

      {actions.quickView}
    </>
  );
};

export default ViewedPage;
