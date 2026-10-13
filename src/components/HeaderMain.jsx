import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { asset } from '../utils/asset';

const actions = [
  { key: 'viewed', icon: 'viewed', label: 'Просмотренные товары', to: '/viewed' },
  { key: 'compare', icon: 'compare', label: 'Сравнение', to: '/compare' },
  { key: 'favorites', icon: 'favorite', label: 'Избранное', to: '/favorites' },
  { key: 'cart', icon: 'cart', label: 'Корзина', to: '/cart', yellow: true },
];

const HeaderMain = ({ organization, counters, menuOpen, onBurgerClick }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = query.trim();
    navigate(search ? `/catalog?search=${encodeURIComponent(search)}` : '/catalog');
    setQuery('');
  };

  return (
    <header className="header-main">
      <div className="container">
        <button
          className={`burger-btn${menuOpen ? ' open' : ''}`}
          type="button"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={onBurgerClick}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        <Link to="/" className="logo" aria-label={`${organization.name} — главная`}>
          <div className="logo-icon">
            <img src={asset('assets/icons/logovector.svg')} alt={organization.name} width="152" height="48" />
          </div>
        </Link>

        <form className="header-search" onSubmit={handleSubmit} role="search">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Введите название: Бинокль армейский"
            autoComplete="off"
            aria-label="Поиск товаров"
          />
          <button className="search-btn" type="submit" aria-label="Найти">
            <Icon name="search" />
          </button>
        </form>

        <div className="header-actions">
          {actions.map((action) => (
            <Link key={action.key} className="header-action-btn" to={action.to} aria-label={action.label}>
              <Icon name={action.icon} size="lg" />
              <span className={`action-badge${action.yellow ? ' action-badge-yellow' : ''}`}>
                {counters[action.key]}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
