import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box, Button, Container, Pagination as MuiPagination, Stack, Typography } from '@mui/material';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import PageHeader from '../components/common/PageHeader';
import ProductGrid from '../components/common/ProductGrid';
import EmptyState from '../components/common/EmptyState';
import CatalogFilters from '../components/catalog/CatalogFilters';

const PER_PAGE = 8;

const compareBy = (sort) => (a, b) => {
  switch (sort) {
    case 'price-asc':
      return a.price - b.price;
    case 'price-desc':
      return b.price - a.price;
    case 'rating':
      return (b.rating ?? 0) - (a.rating ?? 0);
    case 'name':
      return a.name.localeCompare(b.name, 'ru');
    default:
      return Number(b.isHit ?? 0) - Number(a.isHit ?? 0) || (b.reviews ?? 0) - (a.reviews ?? 0);
  }
};

/** Каталог: поиск, фильтры, сортировка и пагинация. */
const CatalogPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { data } = useData();
  const { catalog } = useShop();
  const actions = useShopActions();

  const priceBounds = useMemo(() => {
    const prices = catalog.map((product) => product.price);
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    };
  }, [catalog]);

  const [filters, setFilters] = useState({
    query: searchParams.get('search') ?? '',
    category: slug ?? searchParams.get('category') ?? '',
    brand: '',
    sort: 'popular',
    priceRange: [0, 1],
    inStockOnly: false,
    saleOnly: searchParams.get('sale') === '1' || searchParams.get('promo') === '1',
  });
  const [page, setPage] = useState(1);
  const [boundsInitialized, setBoundsInitialized] = useState(false);

  // диапазон цен инициализируем после загрузки каталога
  useEffect(() => {
    if (!boundsInitialized && priceBounds.max > 0) {
      setFilters((current) => ({ ...current, priceRange: [priceBounds.min, priceBounds.max] }));
      setBoundsInitialized(true);
    }
  }, [boundsInitialized, priceBounds]);

  useEffect(() => {
    setFilters((current) => ({ ...current, category: slug ?? '' }));
    setPage(1);
  }, [slug]);

  const brands = useMemo(
    () =>
      [...new Set(catalog.map((product) => product.brand).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ru')),
    [catalog],
  );

  const filtered = useMemo(() => {
    const text = filters.query.trim().toLowerCase();
    const [min, max] = filters.priceRange;
    const category = data.categories.find((item) => item.slug === filters.category);

    return catalog
      .filter((product) => {
        if (text && !`${product.name} ${product.brand ?? ''}`.toLowerCase().includes(text)) return false;
        if (category && product.categoryId !== category.id) return false;
        if (filters.brand && product.brand !== filters.brand) return false;
        if (product.price < min || product.price > max) return false;
        if (filters.inStockOnly && !product.inStock) return false;
        if (filters.saleOnly && !(product.oldPrice > product.price)) return false;
        return true;
      })
      .sort(compareBy(filters.sort));
  }, [catalog, data.categories, filters]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const activeCategory = data.categories.find((item) => item.slug === filters.category);

  const handleChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const handleReset = () => {
    setFilters({
      query: '',
      category: '',
      brand: '',
      sort: 'popular',
      priceRange: [priceBounds.min, priceBounds.max],
      inStockOnly: false,
      saleOnly: false,
    });
    setPage(1);
  };

  return (
    <>
      <PageHeader
        title={activeCategory ? activeCategory.name : 'Каталог оптических приборов'}
        description={
          activeCategory
            ? `Товары категории «${activeCategory.name}» — ${filtered.length} позиций`
            : 'Поиск, фильтры и сортировка по всему ассортименту магазина'
        }
        breadcrumbs={
          activeCategory
            ? [{ label: 'Каталог', to: '/catalog' }, { label: activeCategory.name }]
            : [{ label: 'Каталог' }]
        }
      />

      <Container maxWidth="xl">
        <CatalogFilters
          values={filters}
          onChange={handleChange}
          onReset={handleReset}
          categories={data.categories}
          brands={brands}
          priceBounds={priceBounds}
          total={filtered.length}
        />

        {visible.length ? (
          <>
            <ProductGrid products={visible} {...actions} />
            <Stack alignItems="center" sx={{ mt: 4 }}>
              <MuiPagination
                count={pageCount}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                showFirstButton
                showLastButton
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                Страница {page} из {pageCount} · показано {visible.length} из {filtered.length} товаров
              </Typography>
            </Stack>
          </>
        ) : (
          <Box sx={{ py: 4 }}>
            <EmptyState
              title="Товары не найдены"
              text="Измените параметры поиска или сбросьте фильтры."
              action={
                <Button variant="contained" onClick={handleReset}>
                  Сбросить фильтры
                </Button>
              }
            />
          </Box>
        )}
      </Container>

      {actions.quickView}
    </>
  );
};

export default CatalogPage;
