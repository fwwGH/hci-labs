import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import PageHeader from '../components/common/PageHeader';
import ProductGrid from '../components/common/ProductGrid';
import EmptyState from '../components/common/EmptyState';

/** Ранее просмотренные товары. */
const ViewedPage = () => {
  const { viewed, getProduct, clearViewed } = useShop();
  const actions = useShopActions();
  const products = viewed.map(getProduct).filter(Boolean);

  return (
    <>
      <PageHeader
        title="Просмотренные товары"
        description={`История просмотров: ${products.length} из 12`}
        breadcrumbs={[{ label: 'Просмотренные' }]}
        actions={
          products.length > 0 && (
            <Button variant="outlined" size="small" onClick={clearViewed}>
              Очистить историю
            </Button>
          )
        }
      />

      <Container maxWidth="xl">
        {products.length === 0 ? (
          <EmptyState
            title="История просмотров пуста"
            text="Откройте любой товар, и он появится в этом списке."
            action={
              <Button component={RouterLink} to="/catalog" variant="contained">
                Перейти в каталог
              </Button>
            }
          />
        ) : (
          <ProductGrid products={products} {...actions} />
        )}
      </Container>

      {actions.quickView}
    </>
  );
};

export default ViewedPage;
