export const formatPrice = (value) => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
