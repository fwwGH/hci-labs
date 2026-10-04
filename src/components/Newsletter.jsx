import Icon from './Icon';

const Newsletter = () => (
  <div className="newsletter-bar">
    <div className="container">
      <div className="newsletter-text">
        <Icon name="telegram" />
        <div>
          <div className="newsletter-title">Подпишитесь и будьте в курсе!</div>
          <div className="newsletter-subtitle">Акции, скидки, распродажи ждут!</div>
        </div>
      </div>
      <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
        <input type="email" placeholder="Введите email" aria-label="Email для подписки" required />
        <button type="submit" className="btn btn-yellow">Подписаться</button>
      </form>
      <label className="newsletter-agree">
        <input type="checkbox" required />
        <span>Я согласен на обработку своих персональных данных</span>
      </label>
    </div>
  </div>
);

export default Newsletter;
