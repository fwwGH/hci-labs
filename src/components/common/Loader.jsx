/** Индикатор загрузки данных и skeleton-заготовки карточек. */
const Loader = ({ text = 'Загружаем данные…', skeletonCount = 4 }) => (
  <div className="loader-wrap" role="status" aria-live="polite">
    <div className="loader-spinner" aria-hidden="true" />
    <p className="loader-text">{text}</p>
    {skeletonCount > 0 && (
      <div className="products-row products-row--skeleton" aria-hidden="true">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-line skeleton-line--image" />
            <div className="skeleton-line" />
            <div className="skeleton-line skeleton-line--short" />
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Loader;
