import SectionHeader from './SectionHeader';
import { asset } from '../utils/asset';

const GoodsCategory = ({ category }) => (
  <div className="our-goods-category">
    <div className="our-goods-header">
      <div className="our-goods-icon">
        <img src={asset(`assets/icons/${category.icon}.svg`)} alt="" aria-hidden="true" width="40" height="40" />
      </div>
      <a href="#" className="our-goods-title">{category.title}</a>
    </div>
    <ul className="our-goods-links">
      {category.links.map((link) => (
        <li key={link.title}>
          <a href="#">{link.title} <span>{link.count}</span></a>
        </li>
      ))}
    </ul>
    <div className="our-goods-show-all"><a href="#">Показать все ···</a></div>
  </div>
);

const OurGoods = ({ title, categories }) => (
  <section className="section">
    <div className="container">
      <SectionHeader title={title} />
      <div className="our-goods-grid">
        {categories.map((category) => (
          <GoodsCategory key={category.slug} category={category} />
        ))}
      </div>
    </div>
  </section>
);

export default OurGoods;
