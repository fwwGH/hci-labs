import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useShop } from '../context/ShopContext';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { asset } from '../utils/asset';
import { formatPrice } from '../utils/format';

const DELIVERY_THRESHOLD = 5000;
const DELIVERY_PRICE = 390;

/** Корзина: таблица позиций, изменение количества и итоговая панель. */
const CartPage = () => {
  const { cartItems, cartTotal, cartCount, setQuantity, removeFromCart, clearCart, notify } = useShop();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const delivery = cartTotal > 0 && cartTotal < DELIVERY_THRESHOLD ? DELIVERY_PRICE : 0;
  const total = cartTotal + delivery;

  const handleCheckout = () => {
    notify(`Заказ на сумму ${formatPrice(total)} оформлен. Спасибо за покупку!`);
    clearCart();
  };

  return (
    <>
      <PageHeader
        title="Корзина"
        description={cartCount ? `Товаров в корзине: ${cartCount}` : 'Корзина пуста'}
        breadcrumbs={[{ label: 'Корзина' }]}
        actions={
          cartItems.length > 0 && (
            <Button variant="outlined" size="small" onClick={() => setConfirmOpen(true)}>
              Очистить корзину
            </Button>
          )
        }
      />

      <Container maxWidth="xl">
        {cartItems.length === 0 ? (
          <EmptyState
            title="В корзине нет товаров"
            text="Добавьте приборы из каталога — они появятся здесь."
            action={
              <Button component={RouterLink} to="/catalog" variant="contained">
                Перейти в каталог
              </Button>
            }
          />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Товар</TableCell>
                      <TableCell align="right">Цена</TableCell>
                      <TableCell align="center">Количество</TableCell>
                      <TableCell align="right">Сумма</TableCell>
                      <TableCell align="center">Действие</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map(({ product, quantity }) => (
                      <TableRow key={product.id} hover>
                        <TableCell>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Box
                              component="img"
                              src={asset(product.image)}
                              alt={product.name}
                              sx={{ width: 72, height: 54, objectFit: 'cover', borderRadius: 1 }}
                            />
                            <Box>
                              <Typography
                                component={RouterLink}
                                to={`/product/${product.id}`}
                                variant="subtitle2"
                                sx={{ color: 'text.primary', textDecoration: 'none' }}
                              >
                                {product.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {product.brand}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell align="right">{formatPrice(product.price)}</TableCell>
                        <TableCell align="center">
                          <ButtonGroup size="small">
                            <Button
                              aria-label="Уменьшить количество"
                              onClick={() => setQuantity(product.id, quantity - 1)}
                            >
                              <RemoveIcon fontSize="small" />
                            </Button>
                            <Button disabled sx={{ px: 2 }}>
                              {quantity}
                            </Button>
                            <Button
                              aria-label="Увеличить количество"
                              onClick={() => setQuantity(product.id, quantity + 1)}
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                        <TableCell align="right">
                          <strong>{formatPrice(product.price * quantity)}</strong>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            size="small"
                            aria-label={`Удалить ${product.name}`}
                            onClick={() => removeFromCart(product.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h3" component="h3" sx={{ mb: 2 }}>
                  Итого
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Товары ({cartCount})</Typography>
                    <Typography>{formatPrice(cartTotal)}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Доставка</Typography>
                    <Typography>{delivery ? formatPrice(delivery) : 'Бесплатно'}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h3" component="span">
                      К оплате
                    </Typography>
                    <Typography variant="h3" component="span" color="primary.main">
                      {formatPrice(total)}
                    </Typography>
                  </Stack>
                </Stack>

                <Button fullWidth variant="contained" color="secondary" sx={{ mt: 3 }} onClick={handleCheckout}>
                  Оформить заказ
                </Button>
                <Button fullWidth variant="outlined" sx={{ mt: 1 }} component={RouterLink} to="/catalog">
                  Продолжить покупки
                </Button>

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                  Бесплатная доставка при заказе от {formatPrice(DELIVERY_THRESHOLD)}.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      <ConfirmDialog
        open={confirmOpen}
        title="Очистить корзину?"
        text="Все товары будут удалены из корзины."
        confirmText="Очистить"
        onConfirm={() => {
          clearCart();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default CartPage;
