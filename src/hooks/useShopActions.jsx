import { useCallback, useState } from 'react';
import QuickViewModal from '../components/common/QuickViewModal';
import { useShop } from '../context/ShopContext';

/**
 * Набор действий над товаром + модальное окно быстрого просмотра.
 * Позволяет любой странице получить одинаковый набор обработчиков
 * и не дублировать код открытия popup.
 */
export const useShopActions = () => {
  const shop = useShop();
  const [quickProduct, setQuickProduct] = useState(null);

  const openQuickView = useCallback((product) => setQuickProduct(product), []);
  const closeQuickView = useCallback(() => setQuickProduct(null), []);

  const quickView = (
    <QuickViewModal
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
    onToggleFavorite: shop.toggleFavorite,
    onToggleCompare: shop.toggleCompare,
    onAddToCart: shop.addToCart,
    onQuickView: openQuickView,
    quickView,
  };
};
