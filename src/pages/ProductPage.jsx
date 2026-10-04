import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Rating,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReplayIcon from '@mui/icons-material/Replay';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import PageHeader from '../components/common/PageHeader';
import ProductGrid from '../components/common/ProductGrid';
import EmptyState from '../components/common/EmptyState';
import { asset } from '../utils/asset';
import { formatPrice } from '../utils/format';
import { specEntries, UNIT_SUFFIX } from '../utils/specs';

const BENEFITS = [
  { icon: <VerifiedIcon fontSize="small" />, text: 'Официальная гарантия производителя' },
  { icon: <LocalShippingIcon fontSize="small" />, text: 'Доставка по России от одного дня' },
  { icon: <ReplayIcon fontSize="small" />, text: 'Возврат в течение 14 дней' },
];

/** Страница товара: галерея, покупка, характеристики и отзывы (Tabs). */
const ProductPage = () => {
  const { id } = useParams();
  const { data } = useData();
  const { catalog, getProduct, favorites, compare, addToCart, toggleFavorite, toggleCompare, markViewed } = useShop();
  const actions = useShopActions();
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(0);

  const product = getProduct(id);

  useEffect(() => {
    if (product) markViewed(product.id);
  }, [product, markViewed]);

  const category = data.categories.find((item) => item.id === product?.categoryId);
  const reviews = useMemo(
    () => data.reviews.filter((review) => String(review.productId) === String(id)),
    [data.reviews, id],
  );
  const related = useMemo(
    () =>
      product
        ? catalog.filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4)
        : [],
    [catalog, product],
  );

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <EmptyState
          title="Товар не найден"
          text={`Позиция с идентификатором ${id} отсутствует в каталоге.`}
          action={
            <Button component={RouterLink} to="/catalog" variant="contained">
              Вернуться в каталог
            </Button>
          }
        />
      </Container>
    );
  }

  const isFavorite = favorites.some((item) => String(item) === String(product.id));
  const inCompare = compare.some((item) => String(item) === String(product.id));
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const specs = specEntries(product.specs);

  return (
    <>
      <PageHeader
        title={product.name}
        breadcrumbs={[
          { label: 'Каталог', to: '/catalog' },
          ...(category ? [{ label: category.name, to: `/catalog/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: 2, position: 'relative' }}>
              <Box
                component="img"
                src={asset(product.image)}
                alt={product.name}
                sx={{ width: '100%', borderRadius: 2 }}
              />
              {discount > 0 && (
                <Chip label={`-${discount}%`} color="warning" sx={{ position: 'absolute', top: 16, left: 16 }} />
              )}
            </Paper>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
              {BENEFITS.map((benefit) => (
                <Chip key={benefit.text} icon={benefit.icon} label={benefit.text} variant="outlined" />
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                {product.rating ? product.rating.toFixed(2) : '—'} · {product.reviews} отзывов
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
              <Chip label={`Бренд: ${product.brand}`} />
              <Chip
                label={product.inStock ? 'В наличии' : 'Под заказ'}
                color={product.inStock ? 'success' : 'default'}
              />
              {product.isHit && <Chip label="Хит продаж" color="error" variant="outlined" />}
              {product.isNew && <Chip label="Новинка" color="success" variant="outlined" />}
            </Stack>

            <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 2 }}>
              <Typography variant="h2" color="primary.main" sx={{ fontWeight: 800 }}>
                {formatPrice(product.price)}
              </Typography>
              {product.oldPrice && (
                <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {formatPrice(product.oldPrice)}
                </Typography>
              )}
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }} alignItems="center">
              <TextField
                type="number"
                label="Количество"
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                inputProps={{ min: 1 }}
                sx={{ width: 140 }}
              />
              <Button
                variant="contained"
                size="large"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => addToCart(product.id, quantity)}
              >
                Добавить в корзину
              </Button>
              <Button
                variant="outlined"
                startIcon={<FavoriteIcon />}
                color={isFavorite ? 'error' : 'primary'}
                onClick={() => toggleFavorite(product.id)}
              >
                {isFavorite ? 'В избранном' : 'В избранное'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<CompareArrowsIcon />}
                color={inCompare ? 'secondary' : 'primary'}
                onClick={() => toggleCompare(product.id)}
              >
                {inCompare ? 'В сравнении' : 'Сравнить'}
              </Button>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
              <Tab label={`Характеристики (${specs.length})`} />
              <Tab label={`Отзывы (${reviews.length})`} />
            </Tabs>

            {tab === 0 &&
              (specs.length ? (
                <Table size="small">
                  <TableBody>
                    {specs.map((spec) => (
                      <TableRow key={spec.key}>
                        <TableCell sx={{ color: 'text.secondary', width: '50%' }}>{spec.label}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>
                          {spec.value}
                          {UNIT_SUFFIX[spec.key] ?? ''}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Alert severity="info">Характеристики для этого товара не заполнены.</Alert>
              ))}

            {tab === 1 &&
              (reviews.length ? (
                <List>
                  {reviews.map((review) => (
                    <ListItem key={review.id} alignItems="flex-start" divider>
                      <ListItemAvatar>
                        <Avatar>{review.author.slice(0, 1)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="subtitle2">{review.author}</Typography>
                            <Rating value={review.rating} readOnly size="small" />
                            <Typography variant="caption" color="text.secondary">
                              {review.date}
                            </Typography>
                          </Stack>
                        }
                        secondary={review.text}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Alert severity="info">Пока никто не оставил отзыв об этом товаре.</Alert>
              ))}
          </Grid>
        </Grid>

        {related.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
              Похожие товары
            </Typography>
            <ProductGrid products={related} {...actions} />
          </Box>
        )}
      </Container>

      {actions.quickView}
    </>
  );
};

export default ProductPage;
