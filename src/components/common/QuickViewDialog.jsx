import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { asset } from '../../utils/asset';
import { formatPrice } from '../../utils/format';
import { specEntries, UNIT_SUFFIX } from '../../utils/specs';

/** Модальное окно (Dialog) с подробной информацией об объекте предметной области. */
const QuickViewDialog = ({ product, open, onClose, onAddToCart, onToggleFavorite, isFavorite }) => {
  if (!product) return null;

  const { id, name, price, oldPrice, rating, reviews, inStock, brand, image, specs } = product;
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        Быстрый просмотр
        {discount > 0 && <Chip label={`-${discount}%`} color="warning" size="small" sx={{ ml: 2 }} />}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <BoxImage src={asset(image)} alt={name} />
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Chip label={`Бренд: ${brand}`} size="small" />
              <Chip
                label={inStock ? 'В наличии' : 'Нет в наличии'}
                size="small"
                color={inStock ? 'success' : 'default'}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="h3" component="h3" sx={{ mb: 1 }}>
              {name}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating value={rating} precision={0.1} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                {rating ? rating.toFixed(2) : '—'} · {reviews} отзывов
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="baseline" spacing={2} sx={{ my: 2 }}>
              <Typography variant="h2" color="primary.main" sx={{ fontWeight: 800 }}>
                {formatPrice(price)}
              </Typography>
              {oldPrice && (
                <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {formatPrice(oldPrice)}
                </Typography>
              )}
            </Stack>

            <Divider sx={{ mb: 1 }} />
            <Table size="small">
              <TableBody>
                {specEntries(specs)
                  .slice(0, 7)
                  .map((spec) => (
                    <TableRow key={spec.key}>
                      <TableCell sx={{ color: 'text.secondary', borderBottom: 'none', pl: 0 }}>
                        {spec.label}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, borderBottom: 'none' }}>
                        {spec.value}
                        {UNIT_SUFFIX[spec.key] ?? ''}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={() => onToggleFavorite(id)} startIcon={<FavoriteIcon />} color={isFavorite ? 'error' : 'inherit'}>
          {isFavorite ? 'В избранном' : 'В избранное'}
        </Button>
        <Button onClick={onClose}>Закрыть</Button>
        <Button
          component={RouterLink}
          to={`/product/${id}`}
          onClick={onClose}
          variant="outlined"
        >
          Открыть страницу
        </Button>
        <Button variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => onAddToCart(id)}>
          В корзину
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/** Локальный подкомпонент: изображение товара с рамкой. */
const BoxImage = ({ src, alt }) => (
  <Stack
    component="img"
    src={src}
    alt={alt}
    sx={{ width: '100%', height: 'auto', borderRadius: 2, border: 1, borderColor: 'divider' }}
  />
);

export default QuickViewDialog;
