import { Link } from 'react-router-dom';
import Icon from './Icon';

const SectionHeader = ({ title, linkText, to }) => (
  <div className="section-header">
    <h2 className="section-title">{title}</h2>
    {linkText &&
      (to ? (
        <Link to={to} className="section-link">
          {linkText}
          <span className="section-link-icon">
            <Icon name="chevron-right" size="xs" />
          </span>
        </Link>
      ) : (
        <a href="#" className="section-link">
          {linkText}
          <span className="section-link-icon">
            <Icon name="chevron-right" size="xs" />
          </span>
        </a>
      ))}
  </div>
);

export default SectionHeader;
