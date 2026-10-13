import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useShop } from '../context/ShopContext';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { asset } from '../utils/asset';
import { formatPrice } from '../utils/format';
import { SPEC_LABELS, UNIT_SUFFIX, specEntries } from '../utils/specs';

/** Сравнение товаров: таблица характеристик с закреплённой первой колонкой. */
const ComparePage = () => {
  const { compare, getProduct, toggleCompare, addToCart, clearCompare } = useShop();
  const products = compare.map(getProduct).filter(Boolean);

  const specKeys = [...new Set(products.flatMap((product) => Object.keys(product.specs ?? {})))];

  const rows = [
    { key: 'price', label: 'Цена', render: (product) => <strong>{formatPrice(product.price)}</strong> },
    { key: 'brand', label: 'Бренд', render: (product) => product.brand },
    {
      key: 'rating',
      label: 'Рейтинг',
      render: (product) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Rating value={product.rating} precision={0.1} readOnly size="small" />
          <Typography variant="caption">{product.rating?.toFixed(2) ?? '—'}</Typography>
        </Stack>
      ),
    },
    {
      key: 'inStock',
      label: 'Наличие',
      render: (product) => (
        <Chip
          size="small"
          label={product.inStock ? 'В наличии' : 'Под заказ'}
          color={product.inStock ? 'success' : 'default'}
        />
      ),
    },
    ...specKeys.map((key) => ({
      key,
      label: SPEC_LABELS[key] ?? key,
      render: (product) => {
        const spec = specEntries(product.specs).find((item) => item.key === key);
        return spec ? `${spec.value}${UNIT_SUFFIX[key] ?? ''}` : '—';
      },
    })),
  ];

  return (
    <>
      <PageHeader
        title="Сравнение товаров"
        description={`В сравнении ${products.length} из 4 возможных позиций`}
        breadcrumbs={[{ label: 'Сравнение' }]}
        actions={
          products.length > 0 && (
            <Button variant="outlined" size="small" onClick={clearCompare}>
              Очистить сравнение
            </Button>
          )
        }
      />

      <Container maxWidth="xl">
        {products.length === 0 ? (
          <EmptyState
            title="Список сравнения пуст"
            text="Добавьте товары кнопкой «Сравнить» — характеристики появятся в одной таблице."
            action={
              <Button component={RouterLink} to="/catalog" variant="contained">
                Перейти в каталог
              </Button>
            }
          />
        ) : (
          <TableContainer sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <Table size="small" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 0,
                      bgcolor: 'background.paper',
                      zIndex: 2,
                      minWidth: 180,
                    }}
                  >
                    Характеристика
                  </TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} sx={{ minWidth: 220, verticalAlign: 'top' }}>
                      <Stack spacing={1}>
                        <Box
                          component="img"
                          src={asset(product.image)}
                          alt={product.name}
                          sx={{ width: 140, height: 100, objectFit: 'cover', borderRadius: 1 }}
                        />
                        <Typography
                          component={RouterLink}
                          to={`/product/${product.id}`}
                          variant="subtitle2"
                          sx={{ color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                        >
                          {product.name}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={() => addToCart(product.id)}
                          >
                            Купить
                          </Button>
                          <Tooltip title="Убрать из сравнения">
                            <IconButton size="small" color="error" onClick={() => toggleCompare(product.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.key} hover>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        position: 'sticky',
                        left: 0,
                        bgcolor: 'background.paper',
                        zIndex: 1,
                        fontWeight: 600,
                        color: 'text.secondary',
                      }}
                    >
                      {row.label}
                    </TableCell>
                    {products.map((product) => (
                      <TableCell key={`${row.key}-${product.id}`}>{row.render(product)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default ComparePage;
