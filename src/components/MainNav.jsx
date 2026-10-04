import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';

const MainNav = ({ items, moreItems }) => (
  <nav className="header-nav" aria-label="Основная навигация">
    <div className="container">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/catalog" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Каталог
          </NavLink>
        </li>
        {items.map((item) => (
          <li key={item.slug} className="nav-item">
            <NavLink
              to={`/catalog/${item.slug}`}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
        <li className="nav-item">
          <Link to="/manage" className="nav-link nav-link-more">
            Управление <Icon name="chevron-down" size="xs" />
          </Link>
          <div className="nav-dropdown">
            <Link to="/manage">Добавить товар</Link>
            <Link to="/manage">Редактировать каталог</Link>
            <Link to="/favorites">Избранное</Link>
            <Link to="/compare">Сравнение</Link>
            {moreItems.slice(0, 3).map((title) => (
              <Link key={title} to="/catalog">
                {title}
              </Link>
            ))}
          </div>
        </li>
      </ul>
    </div>
  </nav>
);

export default MainNav;
