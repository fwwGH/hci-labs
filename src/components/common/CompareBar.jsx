import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

/** Плавающая панель «В сравнении» — доступна на всех страницах приложения. */
const CompareBar = () => {
  const { compare, getProduct } = useShop();
  const products = compare.map(getProduct).filter(Boolean);

  if (!products.length) return null;

  return (
    <div className="compare-bar" role="region" aria-label="Панель сравнения">
      <div className="container compare-bar-inner">
        <div className="compare-bar-items">
          {products.slice(0, 5).map((product) => (
            <span className="compare-bar-item" key={product.id}>
              {product.name}
            </span>
          ))}
          {products.length > 5 && <span className="compare-bar-item">и ещё {products.length - 5}</span>}
        </div>
        <div className="compare-bar-actions">
          <Link to="/compare" className="btn btn-primary btn-sm">
            Сравнить ({products.length})
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
