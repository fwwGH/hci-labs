import Icon from '../Icon';

/** Постраничная навигация для списков объектов. */
const Pagination = ({ page, pageCount, onChange }) => {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const visible = pages.filter(
    (number) => number === 1 || number === pageCount || Math.abs(number - page) <= 1,
  );

  return (
    <nav className="pagination" aria-label="Постраничная навигация">
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Предыдущая страница"
      >
        <Icon name="chevron-left" size="xs" />
      </button>

      {visible.map((number, index) => (
        <span key={number} className="pagination-cell">
          {index > 0 && number - visible[index - 1] > 1 && <span className="pagination-dots">…</span>}
          <button
            type="button"
            className={`pagination-btn${number === page ? ' active' : ''}`}
            aria-current={number === page ? 'page' : undefined}
            onClick={() => onChange(number)}
          >
            {number}
          </button>
        </span>
      ))}

      <button
        type="button"
        className="pagination-btn"
        onClick={() => onChange(page + 1)}
        disabled={page >= pageCount}
        aria-label="Следующая страница"
      >
        <Icon name="chevron-right" size="xs" />
      </button>
    </nav>
  );
};

export default Pagination;
