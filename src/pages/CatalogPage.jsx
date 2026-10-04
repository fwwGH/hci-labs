import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import PageHeader from '../components/common/PageHeader';
import ProductGrid from '../components/common/ProductGrid';
import Pagination from '../components/common/Pagination';
import EmptyState from '../components/common/EmptyState';
import CatalogToolbar from '../components/catalog/CatalogToolbar';

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

const CatalogPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { data } = useData();
  const { catalog } = useShop();
  const actions = useShopActions();

  const { categories } = data;

  const [filters, setFilters] = useState({
    query: searchParams.get('search') ?? '',
    category: slug ?? searchParams.get('category') ?? '',
    brand: '',
    priceMin: '',
    priceMax: '',
    inStockOnly: false,
    saleOnly: searchParams.get('sale') === '1' || searchParams.get('promo') === '1',
    sort: 'popular',
  });
  const [page, setPage] = useState(1);

  // маршрут /catalog/:slug меняет активную категорию
  useEffect(() => {
    setFilters((current) => ({ ...current, category: slug ?? '' }));
    setPage(1);
  }, [slug]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const brands = useMemo(
    () => [...new Set(catalog.map((product) => product.brand).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ru')),
    [catalog],
  );

  const priceBounds = useMemo(() => {
    const prices = catalog.map((product) => product.price);
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    };
  }, [catalog]);

  const filtered = useMemo(() => {
    const text = filters.query.trim().toLowerCase();
    const min = Number(filters.priceMin) || 0;
    const max = Number(filters.priceMax) || Number.POSITIVE_INFINITY;
    const category = categories.find((item) => item.slug === filters.category);

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
  }, [catalog, categories, filters]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const activeCategory = categories.find((item) => item.slug === filters.category);

  const handleFilterChange = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  const handleReset = () =>
    setFilters({
      query: '',
      category: '',
      brand: '',
      priceMin: '',
      priceMax: '',
      inStockOnly: false,
      saleOnly: false,
      sort: 'popular',
    });

  const cards = {
    favorites: actions.favorites,
    onToggleFavorite: actions.onToggleFavorite,
    onToggleCompare: actions.onToggleCompare,
    onAddToCart: actions.onAddToCart,
    onQuickView: actions.onQuickView,
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

      <section className="section section-catalog">
        <div className="container">
          <CatalogToolbar
            values={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
            categories={categories}
            brands={brands}
            priceBounds={priceBounds}
            total={filtered.length}
          />

          {visible.length ? (
            <>
              <ProductGrid products={visible} {...cards} />
              <Pagination page={page} pageCount={pageCount} onChange={setPage} />
            </>
          ) : (
            <EmptyState
              title="Товары не найдены"
              text="Попробуйте изменить параметры поиска или сбросить фильтры."
              action={
                <button type="button" className="btn btn-primary" onClick={handleReset}>
                  Сбросить фильтры
                </button>
              }
            />
          )}
        </div>
      </section>

      {actions.quickView}
    </>
  );
};

export default CatalogPage;
