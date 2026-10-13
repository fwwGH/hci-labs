import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import PageHeader from '../components/common/PageHeader';
import Icon from '../components/Icon';

const EMPTY_FORM = { name: '', email: '', message: '' };

/** Контакты: реквизиты из JSON и форма обратной связи (состояние + валидация). */
const ContactsPage = () => {
  const { data } = useData();
  const { notify } = useShop();
  const { organization } = data.site;
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Укажите имя';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Укажите корректный e-mail';
    if (form.message.trim().length < 10) nextErrors.message = 'Сообщение должно быть не короче 10 символов';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    notify(`Спасибо, ${form.name}! Мы ответим на ${form.email} в течение дня.`);
    setForm(EMPTY_FORM);
  };

  return (
    <>
      <PageHeader
        title="Контакты"
        description="Свяжитесь с нами удобным способом или заполните форму"
        breadcrumbs={[{ label: 'Контакты' }]}
      />

      <section className="section">
        <div className="container contacts-layout">
          <div className="contacts-info">
            <h2 className="block-title">{organization.name}</h2>
            <ul className="contacts-list">
              <li>
                <Icon name="pin" size="sm" />
                <span>{organization.address}</span>
              </li>
              <li>
                <Icon name="phone" size="sm" />
                <a href={organization.phoneHref}>{organization.phone}</a>
              </li>
              <li>
                <Icon name="email" size="sm" />
                <a href={`mailto:${organization.email}`}>{organization.email}</a>
              </li>
              <li>
                <Icon name="viewed" size="sm" />
                <span>{organization.schedule}</span>
              </li>
            </ul>

            <h3 className="block-title">Наши сотрудники</h3>
            <ul className="team-list">
              {data.users.map((user) => (
                <li key={user.id}>
                  <strong>{user.name}</strong>
                  <span className="muted">{user.email}</span>
                  <span className="muted">{user.phone}</span>
                </li>
              ))}
            </ul>
          </div>

          <form className="contacts-form form-group" onSubmit={handleSubmit}>
            <h2 className="block-title">Написать нам</h2>

            <label className="form-group">
              <span>Имя *</span>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                className={errors.name ? 'input-error' : undefined}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </label>

            <label className="form-group">
              <span>E-mail *</span>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                className={errors.email ? 'input-error' : undefined}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </label>

            <label className="form-group">
              <span>Сообщение *</span>
              <textarea
                rows="5"
                value={form.message}
                onChange={handleChange('message')}
                className={errors.message ? 'input-error' : undefined}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </label>

            <button type="submit" className="btn btn-primary">
              Отправить сообщение
            </button>
            <p className="form-note">Поля со звёздочкой обязательны для заполнения.</p>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactsPage;
