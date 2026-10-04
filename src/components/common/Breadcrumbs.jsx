import { Link } from 'react-router-dom';

/** Навигационная цепочка страницы. */
const Breadcrumbs = ({ items = [] }) => (
  <nav className="breadcrumbs" aria-label="Навигационная цепочка">
    <Link to="/">Главная</Link>
    {items.map((item, index) => (
      <span key={`${item.label}-${index}`}>
        <span className="sep"> / </span>
        {item.to && index !== items.length - 1 ? (
          <Link to={item.to}>{item.label}</Link>
        ) : (
          <span className="current">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumbs;
