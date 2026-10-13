import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Chip, Container, Paper, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import PageHeader from '../components/common/PageHeader';
import ProductGrid from '../components/common/ProductGrid';
import EmptyState from '../components/common/EmptyState';

/** Избранное: множественный выбор, массовые действия и подсветка выбранных карточек. */
const FavoritesPage = () => {
  const {
    favorites,
    getProduct,
    selectedIds,
    toggleSelect,
    selectMany,
    clearSelection,
    toggleFavorite,
    toggleCompare,
    addToCart,
    notify,
  } = useShop();
  const actions = useShopActions();

  const products = favorites.map(getProduct).filter(Boolean);
  const selected = products.filter((product) => selectedIds.some((id) => String(id) === String(product.id)));

  const runForSelected = (action, message) => {
    selected.forEach((product) => action(product.id));
    notify(`${message}: ${selected.length}`);
    clearSelection();
  };

  return (
    <>
      <PageHeader
        title="Избранное"
        description={`Сохранённых товаров: ${products.length}`}
        breadcrumbs={[{ label: 'Избранное' }]}
        actions={
          products.length > 0 && (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => selectMany(products.map((product) => product.id))}
              >
                Выбрать все
              </Button>
              <Button variant="outlined" size="small" onClick={clearSelection}>
                Снять выбор
              </Button>
            </Stack>
          )
        }
      />

      <Container maxWidth="xl">
        {products.length === 0 ? (
          <EmptyState
            title="В избранном пока пусто"
            text="Нажимайте на сердечко в карточке товара, чтобы сохранить его здесь."
            action={
              <Button component={RouterLink} to="/catalog" variant="contained">
                Перейти в каталог
              </Button>
            }
          />
        ) : (
          <>
            <Paper
              variant="outlined"
              sx={{ p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}
            >
              <Chip label={`Выбрано: ${selected.length}`} color="primary" />
              <Box sx={{ flexGrow: 1 }} />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddShoppingCartIcon />}
                  disabled={!selected.length}
                  onClick={() => runForSelected(addToCart, 'Добавлено в корзину')}
                >
                  В корзину
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<CompareArrowsIcon />}
                  disabled={!selected.length}
                  onClick={() => runForSelected(toggleCompare, 'Отправлено в сравнение')}
                >
                  Сравнить
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  disabled={!selected.length}
                  onClick={() => runForSelected(toggleFavorite, 'Убрано из избранного')}
                >
                  Убрать из избранного
                </Button>
              </Stack>
            </Paper>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Отметьте товары галочкой — выбранные карточки подсвечиваются рамкой.
            </Typography>

            <ProductGrid
              products={products}
              selectable
              selectedIds={selectedIds}
              onToggleSelect={toggleSelect}
              {...actions}
            />
          </>
        )}
      </Container>

      {actions.quickView}
    </>
  );
};

export default FavoritesPage;
