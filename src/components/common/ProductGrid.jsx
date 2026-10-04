import ProductCard from '../ProductCard';

/** Сетка карточек товаров с поддержкой множественного выбора. */
const ProductGrid = ({
  products,
  favorites = [],
  selectedIds = [],
  selectable = false,
  onToggleSelect,
  ...cardActions
}) => (
  <div className="products-row products-row--grid" role="list">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        isFavorite={favorites.some((id) => String(id) === String(product.id))}
        isSelected={selectedIds.some((id) => String(id) === String(product.id))}
        selectable={selectable}
        onToggleSelect={onToggleSelect}
        {...cardActions}
      />
    ))}
  </div>
);

export default ProductGrid;
