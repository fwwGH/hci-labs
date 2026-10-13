import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import Rating from '../components/common/Rating';
import Icon from '../components/Icon';
import { asset } from '../utils/asset';
import { formatPrice } from '../utils/format';
import { SPEC_LABELS, UNIT_SUFFIX, specEntries } from '../utils/specs';

/** Сравнение характеристик выбранных товаров в виде таблицы. */
const ComparePage = () => {
  const { compare, getProduct, toggleCompare, addToCart, clearCompare } = useShop();
  const products = compare.map(getProduct).filter(Boolean);

  const specKeys = [...new Set(products.flatMap((product) => Object.keys(product.specs ?? {})))];

  const rows = [
    { key: 'price', label: 'Цена', render: (product) => <strong>{formatPrice(product.price)}</strong> },
    { key: 'brand', label: 'Бренд', render: (product) => product.brand },
    {
      key: 'rating',
      label: 'Рейтинг',
      render: (product) => <Rating value={product.rating} count={product.reviews} />,
    },
    {
      key: 'inStock',
      label: 'Наличие',
      render: (product) => (
        <span className={`chip${product.inStock ? ' chip--success' : ' chip--danger'}`}>
          {product.inStock ? 'В наличии' : 'Под заказ'}
        </span>
      ),
    },
    ...specKeys.map((key) => ({
      key,
      label: SPEC_LABELS[key] ?? key,
      render: (product) => {
        const spec = specEntries(product.specs).find((item) => item.key === key);
        return spec ? `${spec.value}${UNIT_SUFFIX[key] ?? ''}` : '—';
      },
    })),
  ];

  return (
    <>
      <PageHeader
        title="Сравнение товаров"
        description={`В сравнении ${products.length} из 4 возможных позиций`}
        breadcrumbs={[{ label: 'Сравнение' }]}
        actions={
          products.length > 0 && (
            <button type="button" className="btn btn-outline btn-sm" onClick={clearCompare}>
              Очистить сравнение
            </button>
          )
        }
      />

      <section className="section">
        <div className="container">
          {products.length === 0 ? (
            <EmptyState
              title="Список сравнения пуст"
              text="Добавьте товары кнопкой «Сравнить» — характеристики появятся в одной таблице."
              action={
                <Link className="btn btn-primary" to="/catalog">
                  Перейти в каталог
                </Link>
              }
            />
          ) : (
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="compare-th-feature">Характеристика</th>
                    {products.map((product) => (
                      <th key={product.id}>
                        <div className="compare-head">
                          <img src={asset(product.image)} alt={product.name} width="120" height="90" />
                          <Link to={`/product/${product.id}`} className="compare-name">
                            {product.name}
                          </Link>
                          <div className="compare-head-actions">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => addToCart(product.id)}
                            >
                              <Icon name="cart" size="sm" /> Купить
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline btn-sm"
                              onClick={() => toggleCompare(product.id)}
                              aria-label={`Убрать ${product.name} из сравнения`}
                            >
                              Убрать
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.key}>
                      <th className="compare-th-feature">{row.label}</th>
                      {products.map((product) => (
                        <td key={`${row.key}-${product.id}`}>{row.render(product)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ComparePage;
