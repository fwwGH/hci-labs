import SectionHeader from './SectionHeader';
import ProductCarousel from './ProductCarousel';

const Hits = ({ title, products, ...shop }) => (
  <section className="section section-hits">
    <div className="container">
      <SectionHeader title={title} linkText="Смотреть весь каталог" to="/catalog" />
      <ProductCarousel
        label={title}
        products={products.filter((product) => product.isHit || product.inStock).slice(0, 8)}
        {...shop}
      />
    </div>
  </section>
);

export default Hits;
