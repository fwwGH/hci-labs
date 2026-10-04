import Icon from '../Icon';

export const SORT_OPTIONS = [
  { id: 'popular', title: 'По популярности' },
  { id: 'price-asc', title: 'Сначала дешёвые' },
  { id: 'price-desc', title: 'Сначала дорогие' },
  { id: 'rating', title: 'По рейтингу' },
  { id: 'name', title: 'По названию' },
];

/** Панель поиска, фильтрации и сортировки каталога. */
const CatalogToolbar = ({
  values,
  onChange,
  onReset,
  categories,
  brands,
  priceBounds,
  total,
}) => {
  const set = (key) => (event) => {
    const target = event.target;
    onChange(key, target.type === 'checkbox' ? target.checked : target.value);
  };

  return (
    <div className="catalog-toolbar">
      <div className="catalog-toolbar-row">
        <label className="field field--search">
          <span className="field-label">Поиск по названию</span>
          <span className="field-input-wrap">
            <Icon name="search" size="sm" />
            <input
              type="search"
              value={values.query}
              onChange={set('query')}
              placeholder="Например: бинокль Veber"
            />
          </span>
        </label>

        <label className="field">
          <span className="field-label">Категория</span>
          <select value={values.category} onChange={set('category')}>
            <option value="">Все категории</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">Бренд</span>
          <select value={values.brand} onChange={set('brand')}>
            <option value="">Все бренды</option>
            {brands.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field-label">Сортировка</span>
          <select value={values.sort} onChange={set('sort')}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="catalog-toolbar-row catalog-toolbar-row--bottom">
        <label className="field field--price">
          <span className="field-label">
            Цена, ₽ ({priceBounds.min} – {priceBounds.max})
          </span>
          <span className="field-range">
            <input
              type="number"
              min={priceBounds.min}
              max={priceBounds.max}
              value={values.priceMin}
              onChange={set('priceMin')}
              placeholder="от"
              aria-label="Цена от"
            />
            <span className="field-range-dash">—</span>
            <input
              type="number"
              min={priceBounds.min}
              max={priceBounds.max}
              value={values.priceMax}
              onChange={set('priceMax')}
              placeholder="до"
              aria-label="Цена до"
            />
          </span>
        </label>

        <label className="checkbox-field">
          <input type="checkbox" checked={values.inStockOnly} onChange={set('inStockOnly')} />
          <span>Только в наличии</span>
        </label>

        <label className="checkbox-field">
          <input type="checkbox" checked={values.saleOnly} onChange={set('saleOnly')} />
          <span>Только со скидкой</span>
        </label>

        <div className="catalog-toolbar-actions">
          <span className="catalog-found">Найдено: {total}</span>
          <button type="button" className="btn btn-outline btn-sm" onClick={onReset}>
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogToolbar;
