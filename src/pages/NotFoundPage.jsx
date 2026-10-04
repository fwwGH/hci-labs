import { Link } from 'react-router-dom';
import EmptyState from '../components/common/EmptyState';

const NotFoundPage = () => (
  <section className="section">
    <div className="container">
      <EmptyState
        icon="404"
        title="Страница не найдена"
        text="Возможно, адрес указан с ошибкой или страница была перемещена."
        action={
          <div className="not-found-actions">
            <Link className="btn btn-primary" to="/">
              На главную
            </Link>
            <Link className="btn btn-outline" to="/catalog">
              В каталог
            </Link>
          </div>
        }
      />
    </div>
  </section>
);

export default NotFoundPage;
