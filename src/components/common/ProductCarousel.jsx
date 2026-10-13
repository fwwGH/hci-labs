import { useState } from 'react';
import { Box, Grid, IconButton, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProductCard from './ProductCard';

/**
 * Карусель карточек на главной странице: переключение страниц
 * стрелками (IconButton) и точками-индикаторами.
 */
const ProductCarousel = ({ products, label, perPage = 4, favorites = [], compare = [], ...cardActions }) => {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(products.length / perPage));
  const current = Math.min(page, pageCount - 1);
  const visible = products.slice(current * perPage, (current + 1) * perPage);

  if (!products.length) return null;

  return (
    <Box aria-label={label}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          onClick={() => setPage(Math.max(0, current - 1))}
          disabled={current === 0}
          aria-label="Предыдущие товары"
        >
          <ChevronLeftIcon />
        </IconButton>

        <Grid container spacing={2} sx={{ flex: 1 }}>
          {visible.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard
                product={product}
                isFavorite={favorites.some((id) => String(id) === String(product.id))}
                inCompare={compare.some((id) => String(id) === String(product.id))}
                {...cardActions}
              />
            </Grid>
          ))}
        </Grid>

        <IconButton
          onClick={() => setPage(Math.min(pageCount - 1, current + 1))}
          disabled={current >= pageCount - 1}
          aria-label="Следующие товары"
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>

      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
        {Array.from({ length: pageCount }, (_, index) => (
          <Box
            key={index}
            component="button"
            type="button"
            aria-label={`Страница ${index + 1}`}
            onClick={() => setPage(index)}
            sx={{
              width: 10,
              height: 10,
              p: 0,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              bgcolor: index === current ? 'primary.main' : 'action.disabled',
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ProductCarousel;
