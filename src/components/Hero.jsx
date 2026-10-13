import HeroSlider from './HeroSlider';

const Hero = ({ mainSlides, sideSlides }) => (
  <section className="hero" aria-label="Главный баннер">
    <div className="container">
      <div className="hero-wrap">
        <HeroSlider variant="main" slides={mainSlides} />
        <HeroSlider variant="side" slides={sideSlides} />
      </div>
    </div>
  </section>
);

export default Hero;
