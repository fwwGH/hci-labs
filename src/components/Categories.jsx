import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import { asset } from '../utils/asset';

const Categories = ({ title, categories }) => (
  <section className="section">
    <div className="container">
      <SectionHeader title={title} linkText="Перейти в каталог" to="/catalog" />
      <div className="categories-grid" aria-label="Категории товаров">
        {categories.map((category) => (
          <Link key={category.slug} to={`/catalog/${category.slug}`} className="category-card">
            <div className="category-icon">
              {/* iconFile — имя SVG-файла; поле icon в данных хранит эмодзи категории */}
              <img
                src={asset(`assets/icons/${category.iconFile}.svg`)}
                alt=""
                width="48"
                height="48"
                loading="lazy"
              />
            </div>
            <div className="category-name">{category.name}</div>
            <div className="category-count">{category.count} товаров</div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;
