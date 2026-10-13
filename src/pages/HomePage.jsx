import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import HeroSlider from '../components/home/HeroSlider';
import PromoBanners from '../components/home/PromoBanners';
import CategoryGrid from '../components/home/CategoryGrid';
import FeatureList from '../components/home/FeatureList';
import AboutSection from '../components/home/AboutSection';
import ProductCarousel from '../components/common/ProductCarousel';
import { formatPrice } from '../utils/format';

const TABS = [
  { id: 'recommended', title: 'Рекомендуемые', filter: (product) => product.inStock },
  { id: 'new', title: 'Новинки', filter: (product) => product.isNew },
  { id: 'sale', title: 'Скидки', filter: (product) => product.oldPrice > product.price },
  { id: 'hit', title: 'Хиты', filter: (product) => product.isHit },
];

/** Главная страница: баннеры, акции, категории, подборки товаров и информация о магазине. */
const HomePage = () => {
  const { data } = useData();
  const { catalog, viewed, getProduct } = useShop();
  const actions = useShopActions();
  const [tab, setTab] = useState(TABS[0].id);

  const { site, heroSlides, categories, features, banners } = data;
  const activeTab = TABS.find((item) => item.id === tab);

  const selection = useMemo(() => catalog.filter(activeTab.filter).slice(0, 8), [catalog, activeTab]);
  const hits = useMemo(() => catalog.filter((product) => product.isHit).slice(0, 8), [catalog]);
  const viewedProducts = viewed.map(getProduct).filter(Boolean);
  const averagePrice = Math.round(catalog.reduce((sum, product) => sum + product.price, 0) / (catalog.length || 1));

  const cards = {
    favorites: actions.favorites,
    compare: actions.compare,
    onToggleFavorite: actions.onToggleFavorite,
    onToggleCompare: actions.onToggleCompare,
    onAddToCart: actions.onAddToCart,
    onQuickView: actions.onQuickView,
  };

  const links = [
    { title: 'Каталог товаров', text: `Поиск, фильтры и сортировка по ${catalog.length} позициям`, to: '/catalog' },
    { title: 'Управление каталогом', text: 'Добавление, редактирование и удаление объектов', to: '/manage' },
    { title: 'Сравнение', text: 'Таблица характеристик выбранных приборов', to: '/compare' },
    { title: 'Корзина', text: 'Оформление заказа и итоговая стоимость', to: '/cart' },
  ];

  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <HeroSlider slides={heroSlides.mainSlides} height={360} />
          </Grid>
          <Grid item xs={12} md={4}>
            <HeroSlider slides={heroSlides.sideSlides} height={360} autoPlay={false} />
          </Grid>
        </Grid>
      </Container>

      <PromoBanners banners={banners} />
      <CategoryGrid categories={categories} />

      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
          Хиты продаж
        </Typography>
        <ProductCarousel products={hits} label="Хиты продаж" {...cards} />
      </Container>

      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
          Подборки товаров
        </Typography>
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" sx={{ mb: 2 }}>
          {TABS.map((item) => (
            <Tab key={item.id} value={item.id} label={item.title} />
          ))}
        </Tabs>
        <ProductCarousel key={tab} products={selection} label="Подборка" {...cards} />
      </Container>

      {viewedProducts.length > 0 && (
        <Container maxWidth="xl" sx={{ mt: 5 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
            Вы недавно смотрели
          </Typography>
          <ProductCarousel products={viewedProducts} label="Просмотренные" {...cards} />
        </Container>
      )}

      <FeatureList features={features} />
      <AboutSection
        title={site.pageTitle}
        text={site.about.text}
        goalsIntro={site.about.goalsIntro}
        goals={site.about.goals}
      />

      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          {links.map((link) => (
            <Grid item xs={12} sm={6} md={3} key={link.to}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h3" component="h3" sx={{ mb: 1 }}>
                    {link.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {link.text}
                  </Typography>
                  <Button component={RouterLink} to={link.to} variant="outlined" size="small">
                    Перейти
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Средняя цена каталога: <strong>{formatPrice(averagePrice)}</strong>
          </Typography>
        </Stack>
      </Container>

      {actions.quickView}
    </Box>
  );
};

export default HomePage;
