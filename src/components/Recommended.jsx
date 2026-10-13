import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import ProductCarousel from './ProductCarousel';

const tabs = [
  { id: 'recommended', title: 'Рекомендуемые', filter: (product) => product.inStock },
  { id: 'new', title: 'Новинки', filter: (product) => product.isNew },
  { id: 'viewed', title: 'Самые просматриваемые', filter: (product, index) => index < 8 },
  { id: 'sale', title: 'Скидки', filter: (product) => product.oldPrice > product.price },
];

const Recommended = ({ products, ...shop }) => {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const activeTab = tabs.find((tab) => tab.id === activeId);

  return (
    <section className="section section-recommended">
      <div className="container">
        <div className="section-header section-header-tabs">
          <div className="tabs-header" role="tablist" aria-label="Фильтр рекомендованных товаров">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn${tab.id === activeId ? ' active' : ''}`}
                type="button"
                role="tab"
                aria-selected={tab.id === activeId}
                onClick={() => setActiveId(tab.id)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <Link to="/catalog" className="section-link section-link-btn section-link-blue">
            Смотреть весь каталог
            <span className="section-link-icon">
              <Icon name="chevron-right" size="xs" />
            </span>
          </Link>
        </div>
        {/* key сбрасывает страницу карусели при смене вкладки */}
        <ProductCarousel
          key={activeId}
          label="Рекомендованные товары"
          products={products.filter(activeTab.filter)}
          {...shop}
        />
      </div>
    </section>
  );
};

export default Recommended;
