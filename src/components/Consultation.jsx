import { useState } from 'react';

const Consultation = ({ organization }) => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    setSent(true);
  };

  return (
    <section className="consultation-section">
      <div className="container">
        <div className="consultation-grid">
          <div className="consultation-form">
            <h2 className="consultation-title">Вам нужна консультация?</h2>
            <p className="consultation-text">
              Задайте их по телефону {organization.phone} или оставьте свои координаты и наш менеджер перезвонит вам через 10 минут
            </p>
            <form id="consultation-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" name="name" placeholder="Ваше имя" required aria-label="Ваше имя" />
                </div>
                <div className="form-group">
                  <input type="tel" name="phone" placeholder="Ваш телефон" required aria-label="Ваш телефон" />
                </div>
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Ваш email" aria-label="Email" />
              </div>
              <div className="form-group">
                <textarea name="question" placeholder="Ваш вопрос" rows="3" aria-label="Вопрос"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Оставить заявку</button>
              <p className="form-note">
                {sent
                  ? 'Спасибо! Заявка отправлена, менеджер скоро свяжется с вами.'
                  : <>Нажимая «Оставить заявку», я соглашаюсь с <a href="#">обработкой персональных данных</a> на условиях <a href="#">Политики конфиденциальности</a>.</>}
              </p>
            </form>
          </div>
          <div className="map-container" aria-label="Карта офиса">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=37.622044%2C55.757082&z=17&l=map&pt=37.622044%2C55.757082~pm2rdl"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              title={`Карта офиса ${organization.name}`}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
