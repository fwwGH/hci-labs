import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

/** Сетка карточек товаров на Grid (Material UI) с поддержкой множественного выбора. */
const ProductGrid = ({
  products,
  favorites = [],
  compare = [],
  selectedIds = [],
  selectable = false,
  onToggleSelect,
  ...cardActions
}) => (
  <Grid container spacing={2}>
    {products.map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <ProductCard
          product={product}
          isFavorite={favorites.some((id) => String(id) === String(product.id))}
          inCompare={compare.some((id) => String(id) === String(product.id))}
          isSelected={selectedIds.some((id) => String(id) === String(product.id))}
          selectable={selectable}
          onToggleSelect={onToggleSelect}
          {...cardActions}
        />
      </Grid>
    ))}
  </Grid>
);

export default ProductGrid;
