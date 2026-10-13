import { useCallback, useState } from 'react';
import QuickViewDialog from '../components/common/QuickViewDialog';
import { useShop } from '../context/ShopContext';

/**
 * Единый набор действий над товаром + модальное окно быстрого просмотра.
 * Любая страница получает одинаковые обработчики для карточек товара.
 */
export const useShopActions = () => {
  const shop = useShop();
  const [quickProduct, setQuickProduct] = useState(null);

  const openQuickView = useCallback((product) => setQuickProduct(product), []);
  const closeQuickView = useCallback(() => setQuickProduct(null), []);

  const quickView = (
    <QuickViewDialog
      product={quickProduct}
      open={Boolean(quickProduct)}
      onClose={closeQuickView}
      onAddToCart={shop.addToCart}
      onToggleFavorite={shop.toggleFavorite}
      isFavorite={
        quickProduct ? shop.favorites.some((id) => String(id) === String(quickProduct.id)) : false
      }
    />
  );

  return {
    favorites: shop.favorites,
    compare: shop.compare,
    onToggleFavorite: shop.toggleFavorite,
    onToggleCompare: shop.toggleCompare,
    onAddToCart: shop.addToCart,
    onQuickView: openQuickView,
    quickView,
  };
};
