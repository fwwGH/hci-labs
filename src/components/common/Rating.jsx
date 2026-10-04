/** Переиспользуемый вывод рейтинга звёздами. */
const Rating = ({ value = 0, count = 0, showValue = true }) => (
  <div className="product-rating">
    <span className="stars" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: star <= Math.round(value) ? '#ffd600' : '#d0d6dd' }}>
          ★
        </span>
      ))}
    </span>
    {showValue && <span className="rating-value">{value ? value.toFixed(2) : ''}</span>}
    {count > 0 && <span className="rating-count">({count} отзывов)</span>}
    <span className="visually-hidden">Рейтинг {value} из 5</span>
  </div>
);

export default Rating;
