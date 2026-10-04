import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import PageHeader from '../components/common/PageHeader';
import ProductGrid from '../components/common/ProductGrid';
import EmptyState from '../components/common/EmptyState';

/** Избранное: множественный выбор, массовые действия, подсветка выбранных карточек. */
const FavoritesPage = () => {
  const {
    favorites,
    getProduct,
    selectedIds,
    toggleSelect,
    selectMany,
    clearSelection,
    toggleFavorite,
    toggleCompare,
    addToCart,
    notify,
  } = useShop();
  const actions = useShopActions();

  const products = favorites.map(getProduct).filter(Boolean);
  const selectedProducts = products.filter((product) => selectedIds.some((id) => String(id) === String(product.id)));

  const handleAddSelectedToCart = () => {
    selectedProducts.forEach((product) => addToCart(product.id));
    notify(`Добавлено в корзину: ${selectedProducts.length}`);
    clearSelection();
  };

  const handleRemoveSelected = () => {
    selectedProducts.forEach((product) => toggleFavorite(product.id));
    notify(`Убрано из избранного: ${selectedProducts.length}`, 'warning');
    clearSelection();
  };

  const handleCompareSelected = () => {
    selectedProducts.forEach((product) => toggleCompare(product.id));
    notify(`Добавлено в сравнение: ${selectedProducts.length}`);
    clearSelection();
  };

  return (
    <>
      <PageHeader
        title="Избранное"
        description={`Сохранённых товаров: ${products.length}`}
        breadcrumbs={[{ label: 'Избранное' }]}
        actions={
          products.length > 0 && (
            <div className="bulk-actions">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => selectMany(products.map((product) => product.id))}
              >
                Выбрать все
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={clearSelection}>
                Снять выбор
              </button>
            </div>
          )
        }
      />

      <section className="section">
        <div className="container">
          {products.length === 0 ? (
            <EmptyState
              title="В избранном пока пусто"
              text="Нажимайте на сердечко в карточке товара, чтобы сохранить его здесь."
              action={
                <Link className="btn btn-primary" to="/catalog">
                  Перейти в каталог
                </Link>
              }
            />
          ) : (
            <>
              <div className="selection-panel">
                <span className="selection-count">Выбрано: {selectedProducts.length}</span>
                <div className="selection-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={!selectedProducts.length}
                    onClick={handleAddSelectedToCart}
                  >
                    В корзину
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    disabled={!selectedProducts.length}
                    onClick={handleCompareSelected}
                  >
                    Сравнить
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm btn-danger"
                    disabled={!selectedProducts.length}
                    onClick={handleRemoveSelected}
                  >
                    Убрать из избранного
                  </button>
                </div>
              </div>

              <ProductGrid
                products={products}
                selectable
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                {...actions}
              />
            </>
          )}
        </div>
      </section>

      {actions.quickView}
    </>
  );
};

export default FavoritesPage;
