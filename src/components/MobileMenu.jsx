import { Link } from 'react-router-dom';
import Icon from './Icon';
import { asset } from '../utils/asset';

const MobileMenu = ({ open, onClose, organization, items }) => (
  <div className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open} role="dialog" aria-label="Меню">
    <div className="mobile-menu-view mobile-menu-view-main">
      <div className="mobile-menu-header">
        <Link to="/" className="logo" onClick={onClose}>
          <div className="logo-icon">
            <img src={asset('assets/icons/logovector.svg')} alt={organization.name} width="152" height="48" />
          </div>
        </Link>
        <button className="mobile-menu-close" type="button" aria-label="Закрыть меню" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="mobile-menu-city">
        <Icon name="pin" size="sm" />
        <span>{organization.city}</span>
      </div>

      <nav className="mobile-nav" aria-label="Мобильное меню">
        {items.map((item) => (
          <Link key={item.to + item.title} className="mobile-nav-item" to={item.to} onClick={onClose}>
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="mobile-menu-footer">
        <div className="mobile-menu-phone">
          <Icon name="phone" size="sm" />
          <a href={organization.phoneHref}>{organization.phone}</a>
        </div>
        <div className="mobile-menu-email">
          <Icon name="email" size="sm" />
          <a href={`mailto:${organization.email}`}>{organization.email}</a>
        </div>
      </div>
    </div>
  </div>
);

export default MobileMenu;
