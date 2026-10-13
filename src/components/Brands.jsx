import SectionHeader from './SectionHeader';
import { asset } from '../utils/asset';

const Brands = ({ title, brands }) => (
  <section className="brands-section section">
    <div className="container">
      <SectionHeader title={title} linkText="Все Бренды" />
      <div className="brands-list" role="list" aria-label="Бренды производителей">
        <div className="brand-item" role="listitem">
          <img
            className="brands-together-img"
            src={asset('assets/icons/BrandsTogether.svg')}
            alt={brands.map((brand) => brand.name).join(', ')}
          />
        </div>
      </div>
    </div>
  </section>
);

export default Brands;
