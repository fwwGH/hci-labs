# Tele-Optics — лабораторная работа № 3

**Тема:** использование готовых библиотек компонентов.

Приложение из лабораторной работы № 2 полностью переработано на **Material UI (MUI)**:
все страницы собраны из готовых компонентов библиотеки `@mui/material` и
иконок `@mui/icons-material`, добавлены новые функции и единая тема.

## Использованная библиотека

**Material UI (MUI) v5** — `@mui/material`, `@mui/icons-material`,
`@emotion/react`, `@emotion/styled`.

Тема оформления описана в `src/theme.js` (`createTheme`): палитра, типографика,
скругления и переопределения компонентов. Светлая и тёмная схемы собираются из
одной фабрики `getTheme(mode)`.

## Использованные компоненты MUI

| Компонент | Где применён | Назначение |
| --- | --- | --- |
| `AppBar`, `Toolbar` | `components/layout/AppHeader.jsx` | Верхняя панель приложения |
| `Drawer` | `AppHeader.jsx` | Мобильное меню с навигацией и категориями |
| `Tabs`, `Tab` | `AppHeader.jsx`, `pages/ProductPage.jsx`, `pages/HomePage.jsx` | Меню категорий, характеристики/отзывы, подборки товаров |
| `Autocomplete` | `AppHeader.jsx`, `pages/ManagePage.jsx` | Поиск с автодополнением в шапке и поиск по каталогу |
| `Menu`, `MenuItem` | `AppHeader.jsx` | Выпадающее меню профиля пользователя |
| `Avatar` | `AppHeader.jsx`, `pages/ContactsPage.jsx`, `components/home/FeatureList.jsx` | Аватар пользователя, сотрудники, преимущества |
| `Badge` | `AppHeader.jsx` | Счётчики избранного, сравнения, корзины |
| `IconButton`, `Tooltip` | по всему приложению | Иконки-кнопки с подсказками при наведении |
| `Switch` | `AppHeader.jsx`, `components/catalog/CatalogFilters.jsx`, `components/catalog/ProductFormDialog.jsx` | Тёмная тема, фильтры «в наличии»/«со скидкой», флаги товара |
| `Button`, `ButtonGroup` | по всему приложению, `pages/CartPage.jsx` | Действия и изменение количества в корзине |
| `ToggleButton`, `ToggleButtonGroup` | `components/catalog/CatalogFilters.jsx` | Выбор сортировки каталога |
| `Card`, `CardMedia`, `CardContent`, `CardActions`, `CardActionArea` | `components/common/ProductCard.jsx`, `components/home/*` | Карточки товаров, категорий, акций |
| `Chip` | `ProductCard.jsx`, `pages/ProductPage.jsx`, `pages/ComparePage.jsx`, `AppFooter.jsx` | Метки «ХИТ», «Новинка», скидки, наличие, бренды |
| `Rating` | `ProductCard.jsx`, `pages/ProductPage.jsx`, `pages/ComparePage.jsx` | Рейтинг товара и отзывов |
| `Dialog`, `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions` | `components/common/QuickViewDialog.jsx`, `components/common/ConfirmDialog.jsx`, `components/catalog/ProductFormDialog.jsx` | Быстрый просмотр, подтверждение удаления, форма товара |
| `TextField` | `components/catalog/*`, `pages/ContactsPage.jsx`, `AppFooter.jsx` | Поиск, формы, подписка |
| `FormControl`, `InputLabel`, `Select`, `MenuItem` | `CatalogFilters.jsx`, `ProductFormDialog.jsx` | Фильтры категории/бренда, выбор категории и изображения |
| `Checkbox`, `FormControlLabel` | `ProductCard.jsx`, `pages/ManagePage.jsx`, `pages/FavoritesPage.jsx` | Множественный выбор товаров |
| `Slider` | `components/catalog/CatalogFilters.jsx` | Диапазон цен |
| `Table`, `TableContainer`, `TableHead`, `TableBody`, `TableRow`, `TableCell` | `pages/CartPage.jsx`, `pages/ComparePage.jsx`, `pages/ManagePage.jsx`, `ProductPage.jsx`, `QuickViewDialog.jsx` | Корзина, сравнение, управление каталогом, характеристики |
| `Pagination` | `pages/CatalogPage.jsx`, `pages/ManagePage.jsx` | Постраничная навигация |
| `Accordion`, `AccordionSummary`, `AccordionDetails` | `components/catalog/ProductFormDialog.jsx` | Свёрнутый блок характеристик в форме |
| `Alert`, `Snackbar` | `components/common/Notifications.jsx` | Всплывающие уведомления о действиях |
| `Skeleton`, `LinearProgress` | `components/common/LoadingState.jsx` | Состояние загрузки данных |
| `Breadcrumbs` | `components/common/PageHeader.jsx` | Хлебные крошки страниц |
| `SpeedDial`, `SpeedDialAction`, `SpeedDialIcon` | `components/layout/QuickActions.jsx` | Быстрые действия в правом нижнем углу |
| `List`, `ListItem`, `ListItemButton`, `ListItemText`, `ListItemIcon`, `ListItemAvatar` | `AppHeader.jsx`, `AppFooter.jsx`, `AboutSection.jsx`, `ContactsPage.jsx` | Списки навигации, целей, сотрудников, отзывов |
| `Paper`, `Divider` | по всему приложению | Панели, разделители |
| `Container`, `Grid`, `Stack`, `Box`, `Typography`, `Link` | по всему приложению | Сетка и типографика страниц |
| `ThemeProvider`, `CssBaseline` | `src/App.jsx` | Подключение темы и глобальных стилей |
| `useTheme`, `useMediaQuery`, `useScrollTrigger` | `AppHeader.jsx`, `QuickActions.jsx` | Адаптивность и поведение при прокрутке |

Дополнительно подключены 36 иконок из `@mui/icons-material`
(`MenuIcon`, `SearchIcon`, `ShoppingCartIcon`, `FavoriteIcon`, `DarkModeIcon`,
`LightModeIcon`, `CompareArrowsIcon`, `AddShoppingCartIcon` и другие).

## Новые функции по сравнению с лабораторной работой № 2

1. **Светлая и тёмная тема** — переключатель в шапке, выбор сохраняется в
   `localStorage` (`tele-optics:theme-mode`), вся палитра перестраивается через
   `createTheme`.
2. **Поиск с автодополнением** — `Autocomplete` в шапке ищет товары по названию и
   бренду, показывает подсказки и открывает страницу выбранного товара.
3. **Расширенные фильтры каталога** — диапазон цен на `Slider`, переключатели
   «в наличии» и «со скидкой», сортировка на `ToggleButtonGroup`, пагинация MUI
   с выводом «страница N из M».
4. **Уведомления и быстрые действия** — `Snackbar` + `Alert` на все операции
   (добавление, правка, удаление, заказ) и `SpeedDial` с быстрыми переходами.
5. **Модальные окна на `Dialog`** — быстрый просмотр товара, подтверждение
   удаления и форма создания/редактирования товара с валидацией.

## Требования лабораторной работы № 3

| Требование | Реализация |
| --- | --- |
| Выполняются все требования ЛР № 2 | 11 маршрутов, состояние в контекстах, данные из JSON, CRUD, множественный выбор, модальные окна |
| Стилизация одной из библиотек (MaterialUI или Bootstrap) | Material UI v5 + тема в `src/theme.js` |
| Не менее 15 готовых компонентов | более 40 различных компонентов MUI (см. таблицу выше) |
| Не менее трёх страниц на функциональных компонентах | 11 страниц |
| Все страницы в одном стиле | общая тема, `CssBaseline`, единые `Container/Grid/Paper/Card` |
| 3–4 новые функции | 5 новых функций (тема, автопоиск, фильтры, уведомления и быстрые действия, диалоги) |
| `readme.md` со списком компонентов | этот файл |

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Структура проекта

```
public/data/            JSON-данные приложения
src/
  theme.js              тема Material UI (светлая и тёмная)
  App.jsx               ThemeProvider, маршруты, каркас страниц
  components/
    layout/             AppHeader (AppBar, Drawer, Autocomplete), AppFooter,
                        QuickActions (SpeedDial), ScrollToTop
    common/             ProductCard, ProductGrid, ProductCarousel, QuickViewDialog,
                        ConfirmDialog, Notifications, CompareBar, PageHeader,
                        EmptyState, LoadingState
    catalog/            CatalogFilters, ProductFormDialog
    home/               HeroSlider, PromoBanners, CategoryGrid, FeatureList, AboutSection
  context/              DataContext (загрузка JSON), ShopContext (состояние магазина)
  hooks/                useShopActions
  pages/                11 страниц приложения
```

## История коммитов

Каждый коммит добавляет один компонент или одну функцию — как требует задание.

1. `feat: тема приложения на Material UI`
2. `feat: шапка приложения (AppBar, Toolbar, Drawer, Badge)`
3. `feat: поиск с автодополнением (Autocomplete)`
4. `feat: меню профиля пользователя (Menu, Avatar)`
5. `feat: подвал приложения (Grid, List, Paper)`
6. `feat: карточка товара (Card, CardMedia, Chip, Rating)`
7. `feat: сетка и карусель товаров (Grid, IconButton)`
8. `feat: модальное окно быстрого просмотра (Dialog, Table)`
9. `feat: уведомления (Snackbar, Alert)`
10. `feat: фильтры каталога (Slider, Select, ToggleButtonGroup)`
11. `feat: форма товара (Dialog, TextField, Accordion)`
12. `feat: страница каталога с пагинацией (Pagination)`
13. `feat: главная страница (Tabs, HeroSlider, PromoBanners)`
14. `feat: корзина (Table, ButtonGroup)`
15. `feat: сравнение товаров (TableContainer)`
16. `feat: избранное и просмотренные (Checkbox, Chip)`
17. `feat: управление каталогом (Table, ConfirmDialog)`
18. `feat: быстрые действия (SpeedDial)`
19. `feat: тёмная тема с сохранением выбора`
20. `docs: описание библиотеки и списка компонентов`
