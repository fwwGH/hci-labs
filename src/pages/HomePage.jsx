import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import { useShopActions } from '../hooks/useShopActions';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import Hits from '../components/Hits';
import Brands from '../components/Brands';
import Recommended from '../components/Recommended';
import Features from '../components/Features';
import OurGoods from '../components/OurGoods';
import About from '../components/About';
import Consultation from '../components/Consultation';
import ProductCarousel from '../components/ProductCarousel';
import SectionHeader from '../components/SectionHeader';
import { formatPrice } from '../utils/format';

/** Полоса акций — данные о баннерах берутся из public/data/banners.json */
const PromoStrip = ({ banners }) => (
  <section className="section promo-strip">
    <div className="container">
      <SectionHeader title="Акции и спецпредложения" linkText="Все акции" to="/catalog?promo=1" />
      <div className="promo-grid">
        {banners.map((banner) => (
          <article className="promo-card" key={banner.id}>
            <span className="promo-label">Выгодное предложение</span>
            <h3 className="promo-title">{banner.title}</h3>
            <p className="promo-subtitle">{banner.subtitle}</p>
            <div className="promo-prices">
              <span className="promo-old">{banner.oldPrice} ₽</span>
              <span className="promo-new">{banner.newPrice} ₽</span>
            </div>
            <Link className="btn btn-yellow" to={`/product/${banner.productId}`}>
              {banner.btnText}
            </Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const HomePage = () => {
  const { data } = useData();
  const { catalog, viewed, getProduct } = useShop();
  const actions = useShopActions();

  const { site, navigation, heroSlides, categories, brands, features, goods, banners } = data;
  const { organization, pageTitle, about } = site;

  const viewedProducts = viewed.map(getProduct).filter(Boolean);

  const shop = {
    favorites: actions.favorites,
    onToggleFavorite: actions.onToggleFavorite,
    onToggleCompare: actions.onToggleCompare,
    onAddToCart: actions.onAddToCart,
    onQuickView: actions.onQuickView,
  };

  return (
    <>
      <Hero mainSlides={heroSlides.mainSlides} sideSlides={heroSlides.sideSlides} />
      <PromoStrip banners={banners} />
      <Categories title="Популярные категории" categories={categories} />
      <Hits title="Хиты продаж" products={catalog} {...shop} />
      <Brands title="Бренды" brands={brands} />
      <Recommended products={catalog} {...shop} />

      {viewedProducts.length > 0 && (
        <section className="section section-viewed">
          <div className="container">
            <SectionHeader title="Вы недавно смотрели" linkText="Все просмотренные" to="/viewed" />
            <ProductCarousel label="Просмотренные товары" products={viewedProducts} {...shop} />
          </div>
        </section>
      )}

      <Features items={features} />
      <OurGoods title="Наши товары" categories={goods} />
      <About title={pageTitle} text={about.text} goalsIntro={about.goalsIntro} goals={about.goals} />
      <Consultation organization={organization} />

      <section className="section home-links">
        <div className="container">
          <div className="home-links-grid">
            <Link to="/catalog" className="home-link-card">
              <h3>Каталог товаров</h3>
              <p>Поиск, сортировка и фильтры по {catalog.length} позициям</p>
            </Link>
            <Link to="/manage" className="home-link-card">
              <h3>Управление каталогом</h3>
              <p>Добавление, редактирование и удаление товаров</p>
            </Link>
            <Link to="/compare" className="home-link-card">
              <h3>Сравнение</h3>
              <p>Сравните характеристики выбранных приборов</p>
            </Link>
            <Link to="/cart" className="home-link-card">
              <h3>Корзина</h3>
              <p>Оформление заказа и итоговая стоимость</p>
            </Link>
          </div>
          <p className="home-total">
            Средняя цена каталога:{' '}
            <strong>
              {formatPrice(
                Math.round(catalog.reduce((sum, product) => sum + product.price, 0) / (catalog.length || 1)),
              )}
            </strong>
          </p>
        </div>
      </section>

      {actions.quickView}
    </>
  );
};

export default HomePage;
