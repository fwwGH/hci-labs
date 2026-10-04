import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useData } from './DataContext';

/**
 * ShopProvider — состояние приложения: каталог товаров, избранное, сравнение,
 * корзина, множественный выбор и всплывающие уведомления.
 * Все изменения проходят через действия контекста, поэтому состояние можно
 * расширять, не меняя компоненты страниц.
 */
const ShopContext = createContext(null);

const KEYS = {
  favorites: 'tele-optics:favorites',
  compare: 'tele-optics:compare',
  cart: 'tele-optics:cart',
};

const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* приватный режим браузера — просто не сохраняем */
  }
};

const toggleInList = (list, id) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);

export const ShopProvider = ({ children }) => {
  const { data } = useData();

  const [catalog, setCatalog] = useState([]);
  const [favorites, setFavorites] = useState(() => readStorage(KEYS.favorites, []));
  const [compare, setCompare] = useState(() => readStorage(KEYS.compare, []));
  const [cart, setCart] = useState(() => readStorage(KEYS.cart, []));
  const [viewed, setViewed] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // исходные данные из JSON становятся стартовым состоянием каталога
  useEffect(() => {
    if (data?.products) {
      setCatalog(data.products.map((product) => ({ ...product })));
      setSelectedIds([]);
    }
  }, [data]);

  useEffect(() => writeStorage(KEYS.favorites, favorites), [favorites]);
  useEffect(() => writeStorage(KEYS.compare, compare), [compare]);
  useEffect(() => writeStorage(KEYS.cart, cart), [cart]);

  const notify = useCallback((message, severity = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setNotifications((list) => [...list, { id, message, severity }]);
    window.setTimeout(() => {
      setNotifications((list) => list.filter((item) => item.id !== id));
    }, 4000);
  }, []);

  const closeNotification = useCallback((id) => {
    setNotifications((list) => list.filter((item) => item.id !== id));
  }, []);

  const getProduct = useCallback(
    (id) => catalog.find((product) => String(product.id) === String(id)) ?? null,
    [catalog],
  );

  /* ------------------------- работа с объектами (CRUD) ------------------------- */

  const addProduct = useCallback(
    (draft) => {
      const nextId = catalog.reduce((max, product) => Math.max(max, Number(product.id) || 0), 0) + 1;
      const product = {
        rating: 0,
        reviews: 0,
        isHit: false,
        isNew: true,
        inStock: true,
        oldPrice: null,
        specs: {},
        ...draft,
        id: nextId,
      };
      setCatalog((list) => [product, ...list]);
      notify(`Товар «${product.name}» добавлен в каталог`);
      return product;
    },
    [catalog, notify],
  );

  const updateProduct = useCallback(
    (id, patch) => {
      setCatalog((list) =>
        list.map((product) => (String(product.id) === String(id) ? { ...product, ...patch } : product)),
      );
      notify('Изменения сохранены');
    },
    [notify],
  );

  const deleteProduct = useCallback(
    (id) => {
      setCatalog((list) => list.filter((product) => String(product.id) !== String(id)));
      setFavorites((list) => list.filter((item) => String(item) !== String(id)));
      setCompare((list) => list.filter((item) => String(item) !== String(id)));
      setCart((list) => list.filter((item) => String(item.id) !== String(id)));
      setSelectedIds((list) => list.filter((item) => String(item) !== String(id)));
      notify('Товар удалён из каталога', 'warning');
    },
    [notify],
  );

  const deleteSelected = useCallback(() => {
    const removing = new Set(selectedIds.map(String));
    setCatalog((list) => list.filter((product) => !removing.has(String(product.id))));
    setFavorites((list) => list.filter((item) => !removing.has(String(item))));
    setCompare((list) => list.filter((item) => !removing.has(String(item))));
    setCart((list) => list.filter((item) => !removing.has(String(item.id))));
    notify(`Удалено товаров: ${selectedIds.length}`, 'warning');
    setSelectedIds([]);
  }, [notify, selectedIds]);

  const resetCatalog = useCallback(() => {
    if (!data?.products) return;
    setCatalog(data.products.map((product) => ({ ...product })));
    setSelectedIds([]);
    notify('Каталог восстановлен из JSON-файла');
  }, [data, notify]);

  /* ----------------------------- множественный выбор ---------------------------- */

  const toggleSelect = useCallback((id) => {
    setSelectedIds((list) => toggleInList(list, id));
  }, []);

  const selectMany = useCallback((ids) => setSelectedIds(ids), []);
  const clearSelection = useCallback(() => setSelectedIds([]), []);

  /* --------------------------- избранное / сравнение --------------------------- */

  const toggleFavorite = useCallback((id) => setFavorites((list) => toggleInList(list, id)), []);
  const toggleCompare = useCallback((id) => setCompare((list) => toggleInList(list, id)), []);

  const clearCompare = useCallback(() => {
    setCompare([]);
    notify('Сравнение очищено', 'warning');
  }, [notify]);

  /* --------------------------------- корзина ---------------------------------- */

  const addToCart = useCallback(
    (id, quantity = 1) => {
      setCart((list) => {
        const existing = list.find((item) => String(item.id) === String(id));
        if (existing) {
          return list.map((item) =>
            String(item.id) === String(id) ? { ...item, quantity: item.quantity + quantity } : item,
          );
        }
        return [...list, { id, quantity }];
      });
      notify('Товар добавлен в корзину');
    },
    [notify],
  );

  const removeFromCart = useCallback((id) => {
    setCart((list) => list.filter((item) => String(item.id) !== String(id)));
  }, []);

  const setQuantity = useCallback((id, quantity) => {
    setCart((list) =>
      list
        .map((item) => (String(item.id) === String(id) ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    notify('Корзина очищена', 'warning');
  }, [notify]);

  const markViewed = useCallback((id) => {
    setViewed((list) => [id, ...list.filter((item) => String(item) !== String(id))].slice(0, 12));
  }, []);

  const clearViewed = useCallback(() => {
    setViewed([]);
    notify('Список просмотренных товаров очищен', 'warning');
  }, [notify]);

  /* --------------------------------- выборки ---------------------------------- */

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: getProduct(item.id) }))
        .filter((item) => item.product),
    [cart, getProduct],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const counters = {
    viewed: viewed.length,
    compare: compare.length,
    favorites: favorites.length,
    cart: cartCount,
  };

  const value = {
    catalog,
    favorites,
    compare,
    cart,
    cartItems,
    cartTotal,
    cartCount,
    viewed,
    selectedIds,
    notifications,
    counters,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteSelected,
    resetCatalog,
    toggleSelect,
    selectMany,
    clearSelection,
    toggleFavorite,
    toggleCompare,
    clearCompare,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    markViewed,
    clearViewed,
    notify,
    closeNotification,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop должен вызываться внутри ShopProvider');
  }
  return context;
};
