import { asset } from '../utils/asset';

const Features = ({ items }) => (
  <div className="features-strip" role="list" aria-label="Преимущества">
    <div className="container">
      {items.map((item) => (
        <div key={item.title} className="feature-item" role="listitem">
          <div className="feature-icon">
            <img src={asset(`assets/icons/${item.icon}.svg`)} alt="" aria-hidden="true" width="32" height="32" />
          </div>
          <div className="feature-text">
            <div className="feature-title">{item.title}</div>
            <div className="feature-desc">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Features;
