import { Link } from 'react-router-dom';
import Icon from './Icon';

/** Маршруты для верхнего меню: часть ссылок ведёт на реальные страницы SPA. */
const TOP_ROUTES = {
  'О компании': '/about',
  Контакты: '/contacts',
  Акции: '/catalog?promo=1',
  Распродажа: '/catalog?sale=1',
  Гарантии: '/about',
  Отзывы: '/catalog',
  Блог: '/about',
  Вакансии: '/contacts',
  Доставка: '/about',
  Оплата: '/about',
};

const HeaderTop = ({ organization, topLinks, moreLinks, socials }) => (
  <header className="header-top">
    <div className="container">
      <div className="header-top-left">
        <button className="city-selector" type="button" aria-label="Выбор города">
          <Icon name="pin" size="xs" />
          <span>{organization.city}</span>
          <Icon name="chevron-down" size="xs" />
        </button>
        <nav className="header-top-links" aria-label="Верхнее меню">
          {topLinks.map((link) => (
            <Link
              key={link.title}
              to={TOP_ROUTES[link.title] ?? '/'}
              className={link.accent ? 'header-top-accent' : undefined}
            >
              {link.title}
            </Link>
          ))}
          <div className="top-more">
            <button className="top-more-btn" type="button">
              Еще <Icon name="chevron-down" size="xs" />
            </button>
            <div className="top-more-dropdown" role="menu">
              {moreLinks.map((title) => (
                <Link key={title} to={TOP_ROUTES[title] ?? '/'} role="menuitem">
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
      <div className="header-top-right">
        <div className="header-top-socials" aria-label="Мессенджеры">
          {socials.slice(1).map((social) => (
            <a key={social.icon} href="#" title={social.title} aria-label={social.title}>
              <Icon name={social.icon} />
            </a>
          ))}
        </div>
        <div className="header-top-phones">
          <a href={organization.phoneHref}>
            <Icon name="phone" size="sm" /> {organization.phone}
          </a>
        </div>
        <a className="header-top-email" href={`mailto:${organization.email}`}>
          <Icon name="email" size="sm" /> {organization.email}
        </a>
        <Link className="header-top-auth" to="/contacts">
          Вход / Регистрация
        </Link>
      </div>
    </div>
  </header>
);

export default HeaderTop;
