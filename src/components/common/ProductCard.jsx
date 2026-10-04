import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { asset } from '../../utils/asset';
import { formatPrice } from '../../utils/format';

/**
 * Карточка товара на Material UI (Card, CardMedia, Chip, Rating, IconButton).
 * Используется на главной странице, в каталоге, в избранном и в сравнении.
 */
const ProductCard = ({
  product,
  isFavorite,
  inCompare,
  isSelected,
  selectable = false,
  onToggleFavorite,
  onToggleCompare,
  onAddToCart,
  onQuickView,
  onToggleSelect,
}) => {
  const { id, name, price, oldPrice, rating = 0, reviews = 0, inStock, isHit, isNew, image, brand } = product;
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <Card
      data-product-id={id}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        outline: isSelected ? '2px solid' : 'none',
        outlineColor: 'primary.main',
        outlineOffset: 2,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box component={RouterLink} to={`/product/${id}`} sx={{ display: 'block' }}>
          <CardMedia
            component="img"
            image={asset(image)}
            alt={name}
            loading="lazy"
            sx={{ height: 180, objectFit: 'cover' }}
          />
        </Box>

        <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 8, left: 8 }}>
          {isHit && <Chip label="ХИТ" size="small" color="error" />}
          {isNew && <Chip label="Новинка" size="small" color="success" />}
          {discount > 0 && <Chip label={`-${discount}%`} size="small" color="warning" />}
        </Stack>

        <Stack direction="row" spacing={0.5} sx={{ position: 'absolute', top: 6, right: 6 }}>
          <Tooltip title="В избранное">
            <IconButton
              size="small"
              onClick={() => onToggleFavorite?.(id)}
              aria-label="В избранное"
              sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'background.paper' } }}
            >
              {isFavorite ? <FavoriteIcon color="error" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Сравнить">
            <IconButton
              size="small"
              onClick={() => onToggleCompare?.(id)}
              aria-label="Сравнить"
              color={inCompare ? 'primary' : 'default'}
              sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'background.paper' } }}
            >
              <CompareArrowsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Быстрый просмотр">
            <IconButton
              size="small"
              onClick={() => onQuickView?.(product)}
              aria-label="Быстрый просмотр"
              sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'background.paper' } }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Chip
          label={inStock ? 'В наличии' : 'Нет в наличии'}
          color={inStock ? 'success' : 'default'}
          size="small"
          variant={inStock ? 'filled' : 'outlined'}
          sx={{ position: 'absolute', bottom: 8, left: 8 }}
        />

        {selectable && (
          <Checkbox
            checked={Boolean(isSelected)}
            onChange={() => onToggleSelect?.(id)}
            inputProps={{ 'aria-label': `Выбрать ${name}` }}
            sx={{ position: 'absolute', bottom: 4, right: 4, bgcolor: 'background.paper', borderRadius: 1 }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Rating value={rating} precision={0.1} readOnly size="small" />
          <Typography variant="caption" color="text.secondary">
            {rating ? rating.toFixed(1) : '—'} ({reviews})
          </Typography>
        </Stack>

        <Typography
          component={RouterLink}
          to={`/product/${id}`}
          variant="subtitle2"
          sx={{
            display: 'block',
            mt: 0.5,
            minHeight: 40,
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {name}
        </Typography>

        {brand && (
          <Typography variant="caption" color="text.secondary">
            {brand}
          </Typography>
        )}

        <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 1 }}>
          <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800 }}>
            {formatPrice(price)}
          </Typography>
          {oldPrice && (
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              {formatPrice(oldPrice)}
            </Typography>
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
        <Button size="small" variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => onAddToCart?.(id)}>
          В корзину
        </Button>
        <Button size="small" variant="text" onClick={() => onQuickView?.(product)}>
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
