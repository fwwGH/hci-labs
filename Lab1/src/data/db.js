// src/data/db.js
// Данные приложения. В реальном проекте загружались бы с сервера (json-server),
// здесь вынесены в отдельный модуль для простоты.

export const ORGANIZATION = {
  name: 'Tele-Optics',
  phone: '+7 495 215 0744',
  email: 'sales@tele-optics.ru',
  address: 'Россия, г. Москва, ул. Никольская, д. 15',
};

export const PAGE_TITLE = 'Магазин оптических приборов Tele-Optics';

export const categories = [
  { id: 1, name: 'Бинокли', count: 35 },
  { id: 2, name: 'Телескопы', count: 35 },
  { id: 3, name: 'Дальномеры', count: 35 },
  { id: 4, name: 'Зрительные трубы', count: 35 },
  { id: 5, name: 'Прицелы', count: 35 },
  { id: 6, name: 'Лупы', count: 25 },
  { id: 7, name: 'Монокуляры', count: 35 },
  { id: 8, name: 'Микроскопы', count: 30 },
  { id: 9, name: 'Тепловизоры', count: 30 },
  { id: 10, name: 'Цифровые камеры', count: 20 },
];

export const products = [
  {
    id: 1,
    name: 'Бинокль БПЦ2 10×40 (обрезин., рубин)',
    category: 'Бинокли',
    price: 10190,
    oldPrice: 12450,
    rating: 4.67,
    inStock: true,
  },
  {
    id: 2,
    name: 'Телескоп Veber рефрактор 60/700',
    category: 'Телескопы',
    price: 8490,
    oldPrice: 9900,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 3,
    name: 'Дальномер Nikon Forestry Pro II',
    category: 'Дальномеры',
    price: 32000,
    oldPrice: 38000,
    rating: 4.9,
    inStock: true,
  },
  {
    id: 4,
    name: 'Прицел Vortex Crossfire II 2-7x32',
    category: 'Прицелы',
    price: 18500,
    oldPrice: 21000,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    name: 'Монокуляр Levenhuk Wise 8x25',
    category: 'Монокуляры',
    price: 2990,
    oldPrice: 3500,
    rating: 4.3,
    inStock: false,
  },
  {
    id: 6,
    name: 'Микроскоп Levenhuk Rainbow 50L',
    category: 'Микроскопы',
    price: 4500,
    oldPrice: 5200,
    rating: 4.6,
    inStock: true,
  },
  {
    id: 7,
    name: 'Тепловизор FLIR Scout TK',
    category: 'Тепловизоры',
    price: 52000,
    oldPrice: 59000,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 8,
    name: 'Лупа Veber 5x складная',
    category: 'Лупы',
    price: 590,
    oldPrice: null,
    rating: 4.1,
    inStock: true,
  },
];

export const banners = [
  {
    id: 1,
    title: 'МЫ СНИЗИЛИ ЦЕНЫ! НА НОЧНУЮ ОПТИКУ',
    subtitle: 'Прицел ночного видения с дальномером',
    oldPrice: '155 490',
    newPrice: '149 990',
  },
  {
    id: 2,
    title: 'БИНОКЛЬ DISCOVERY FLINT 8×40',
    subtitle: 'Новое поколение полевых биноклей',
    oldPrice: '8 990',
    newPrice: '7 490',
  },
];
