import { useState, useEffect } from 'react';
import Icon from './Icon';
import { asset } from '../utils/asset';

const SLIDE_INTERVAL = 5000;

// variant: 'main' (большой слайдер с кнопкой) или 'side' (узкий, слайд — ссылка)
const HeroSlider = ({ variant, slides }) => {
  const [current, setCurrent] = useState(0);
  const goTo = (index) => setCurrent((index + slides.length) % slides.length);

  // автопрокрутка; после ручного переключения таймер сбрасывается
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [current, slides.length]);

  const renderImage = (slide, index) => (
    <img
      className={`hero-${variant}-img`}
      src={asset(slide.image)}
      alt={slide.alt}
      loading={index === 0 ? 'eager' : 'lazy'}
    />
  );

  return (
    <div className={`hero-${variant}`}>
      {slides.map((slide, index) => (
        <div key={slide.image} className={`hero-${variant}-slide${index === current ? ' active' : ''}`}>
          {variant === 'main' ? (
            <>
              {renderImage(slide, index)}
              <a className="hero-btn--overlay" href="#">Подробнее →</a>
            </>
          ) : (
            <a href="#">{renderImage(slide, index)}</a>
          )}
        </div>
      ))}

      <button className="hero-arrow-btn hero-arrow-btn--prev" type="button" aria-label="Назад" onClick={() => goTo(current - 1)}>
        <span className="hero-arrow-outer"></span>
        <span className="hero-arrow-inner"><Icon name="chevron-left" /></span>
      </button>
      <button className="hero-arrow-btn hero-arrow-btn--next" type="button" aria-label="Вперёд" onClick={() => goTo(current + 1)}>
        <span className="hero-arrow-outer"></span>
        <span className="hero-arrow-inner"><Icon name="chevron-right" /></span>
      </button>

      <div className="hero-dots-bar" role="tablist">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            className={`hero-dot${index === current ? ' active' : ''}`}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`Слайд ${index + 1}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
