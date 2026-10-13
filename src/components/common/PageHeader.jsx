import Breadcrumbs from './Breadcrumbs';

/** Единый заголовок внутренних страниц приложения. */
const PageHeader = ({ title, description, breadcrumbs, actions, children }) => (
  <section className="page-header">
    <div className="container">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">{title}</h1>
          {description && <p className="page-description">{description}</p>}
        </div>
        {actions && <div className="page-header-actions">{actions}</div>}
      </div>
      {children}
    </div>
  </section>
);

export default PageHeader;
