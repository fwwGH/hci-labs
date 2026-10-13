import { Link } from 'react-router-dom';
import Icon from './Icon';
import Newsletter from './Newsletter';
import { asset } from '../utils/asset';

/** Куда ведут ссылки футера: категории — в каталог, остальные — на статические страницы. */
const STATIC_ROUTES = {
  Доставка: '/about',
  Оплата: '/about',
  Возврат: '/about',
  Производители: '/about',
  Гарантия: '/about',
  Статьи: '/about',
  'О нас': '/about',
  'Оптовые продажи': '/contacts',
  'Личный кабинет': '/contacts',
  Акции: '/catalog?promo=1',
  Распродажа: '/catalog?sale=1',
  Блог: '/about',
  Отзывы: '/catalog',
  Контакты: '/contacts',
  'О компании': '/about',
};

const routeFor = (title, catalogNav) => {
  const category = catalogNav.find((item) => item.title === title);
  if (category) return `/catalog/${category.slug}`;
  return STATIC_ROUTES[title] ?? '/catalog';
};

const LinkList = ({ items, catalogNav }) => (
  <ul className="footer-links">
    {items.map((title) => (
      <li key={title}>
        <Link to={routeFor(title, catalogNav)}>{title}</Link>
      </li>
    ))}
  </ul>
);

const Footer = ({ organization, navigation }) => {
  const { footerCatalog, footerInfo, footerAbout, payments, socials, catalogNav } = navigation;

  return (
    <footer className="footer">
      <Newsletter />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-logo-area">
            <Link to="/" className="footer-logo" aria-label={organization.name}>
              <div className="footer-logo-icon">
                <img src={asset('assets/icons/footer-logovector.svg')} alt="" width="190" height="60" loading="lazy" />
              </div>
            </Link>
            <address className="footer-info">
              <div>
                <Icon name="pin" size="xs" /> {organization.address}
              </div>
              <div style={{ marginTop: 4 }}>{organization.schedule}</div>
              <div style={{ marginTop: 4 }}>
                <a href={`mailto:${organization.email}`} style={{ color: 'var(--clr-primary)' }}>
                  {organization.email}
                </a>
              </div>
            </address>
            <div className="footer-rating">
              <span>Рейтинг магазина</span>
              <div className="stars">★★★★★</div>
              <span>Яндекс.Маркет</span>
            </div>
          </div>

          <div>
            <h3 className="footer-col-title">Каталог</h3>
            <LinkList items={footerCatalog} catalogNav={catalogNav} />
          </div>

          <div>
            <h3 className="footer-col-title">Полезная информация</h3>
            <LinkList items={footerInfo} catalogNav={catalogNav} />
            <div className="footer-payment" style={{ marginTop: 16 }} aria-label="Способы оплаты">
              {payments.map((name) => (
                <span key={name} className="footer-payment-icon">
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-col-title">Контакты</h3>
            <a href={organization.phoneHref} className="footer-phone">
              {organization.phone}
            </a>
            <div className="footer-socials" aria-label="Социальные сети">
              {socials.map((social) => (
                <a key={social.icon} href="#" className="footer-social" aria-label={social.title}>
                  <Icon name={social.icon} />
                </a>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <LinkList items={footerAbout} catalogNav={catalogNav} />
            </div>
            <div className="footer-cta-btns">
              <Link to="/contacts" className="btn btn-outline btn-sm">
                Подписаться на новости
              </Link>
              <Link to="/catalog" className="btn btn-yellow btn-sm">
                Скачать прайс-лист
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} {organization.name}. Все права защищены.
          </div>
          <div className="footer-bottom-links">
            <Link to="/about">Политика конфиденциальности</Link>
            <Link to="/about">Условия соглашения</Link>
            <Link to="/catalog">Карта сайта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
