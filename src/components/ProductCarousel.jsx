import { useState } from 'react';
import Icon from './Icon';
import ProductCard from './ProductCard';

/** Карусель карточек товара с постраничным переключением. */
const ProductCarousel = ({ products, label, perPage = 4, favorites = [], ...cardProps }) => {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(products.length / perPage));
  const goTo = (index) => setPage(Math.min(Math.max(index, 0), pageCount - 1));
  const visible = products.slice(page * perPage, (page + 1) * perPage);

  if (!products.length) return null;

  return (
    <>
      <div className="products-carousel" aria-label={label}>
        <button className="carousel-btn carousel-prev" type="button" aria-label="Назад" onClick={() => goTo(page - 1)}>
          <Icon name="chevron-left" />
        </button>
        <div className="products-row" role="list">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.some((id) => String(id) === String(product.id))}
              {...cardProps}
            />
          ))}
        </div>
        <button className="carousel-btn carousel-next" type="button" aria-label="Вперёд" onClick={() => goTo(page + 1)}>
          <Icon name="chevron-right" />
        </button>
      </div>
      <div className="carousel-dots" role="tablist" aria-label="Страницы карусели">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            className={`carousel-dot${index === page ? ' active' : ''}`}
            type="button"
            aria-label={`Страница ${index + 1}`}
            aria-selected={index === page}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </>
  );
};

export default ProductCarousel;
