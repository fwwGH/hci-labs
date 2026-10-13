import { asset } from '../../utils/asset';

export const EMPTY_PRODUCT = {
  name: '',
  brand: '',
  categoryId: '',
  price: '',
  oldPrice: '',
  inStock: true,
  isHit: false,
  isNew: true,
  image: 'assets/images/bpc2_10x40.jpg',
  specs: { magnification: '', diameter: '', weight: '', country: 'Россия', warranty: '1 год' },
};

/** Валидация формы товара: возвращает объект с ошибками по полям. */
export const validateProduct = (values) => {
  const errors = {};
  if (!values.name || values.name.trim().length < 3) {
    errors.name = 'Название должно содержать минимум 3 символа';
  }
  if (!values.categoryId) {
    errors.categoryId = 'Выберите категорию';
  }
  if (!values.price || Number(values.price) <= 0) {
    errors.price = 'Укажите цену больше нуля';
  }
  if (values.oldPrice && Number(values.oldPrice) < Number(values.price)) {
    errors.oldPrice = 'Старая цена не может быть меньше новой';
  }
  return errors;
};

/**
 * Переиспользуемая форма добавления и редактирования объекта предметной области.
 * Используется в модальном окне на странице управления каталогом.
 */
const ProductForm = ({ values, errors = {}, onChange, onSubmit, onCancel, categories, brands, images, submitText }) => {
  const setField = (field) => (event) => {
    const target = event.target;
    onChange(field, target.type === 'checkbox' ? target.checked : target.value);
  };

  const setSpec = (field) => (event) => {
    onChange('specs', { ...values.specs, [field]: event.target.value });
  };

  return (
    <form
      className="product-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="form-row">
        <label className="form-group">
          <span>Название *</span>
          <input
            type="text"
            value={values.name}
            onChange={setField('name')}
            className={errors.name ? 'input-error' : undefined}
            placeholder="Бинокль Veber BPTs zoom 8-30x50"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </label>

        <label className="form-group">
          <span>Бренд</span>
          <input type="text" list="brand-list" value={values.brand} onChange={setField('brand')} />
          <datalist id="brand-list">
            {brands.map((brand) => (
              <option key={brand} value={brand} />
            ))}
          </datalist>
        </label>
      </div>

      <div className="form-row">
        <label className="form-group">
          <span>Категория *</span>
          <select
            value={values.categoryId}
            onChange={setField('categoryId')}
            className={errors.categoryId ? 'input-error' : undefined}
          >
            <option value="">— выберите —</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <span className="error-message">{errors.categoryId}</span>}
        </label>

        <label className="form-group">
          <span>Изображение</span>
          <select value={values.image} onChange={setField('image')}>
            {images.map((image) => (
              <option key={image} value={image}>
                {image.replace('assets/images/', '')}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label className="form-group">
          <span>Цена, ₽ *</span>
          <input
            type="number"
            min="0"
            value={values.price}
            onChange={setField('price')}
            className={errors.price ? 'input-error' : undefined}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </label>

        <label className="form-group">
          <span>Старая цена, ₽</span>
          <input
            type="number"
            min="0"
            value={values.oldPrice}
            onChange={setField('oldPrice')}
            className={errors.oldPrice ? 'input-error' : undefined}
          />
          {errors.oldPrice && <span className="error-message">{errors.oldPrice}</span>}
        </label>
      </div>

      <div className="form-row form-row--checks">
        <label className="checkbox-field">
          <input type="checkbox" checked={values.inStock} onChange={setField('inStock')} />
          <span>В наличии</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={values.isHit} onChange={setField('isHit')} />
          <span>Хит продаж</span>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" checked={values.isNew} onChange={setField('isNew')} />
          <span>Новинка</span>
        </label>
      </div>

      <fieldset className="product-form-specs">
        <legend>Характеристики</legend>
        <div className="form-row">
          <label className="form-group">
            <span>Увеличение</span>
            <input type="text" value={values.specs.magnification} onChange={setSpec('magnification')} placeholder="10x" />
          </label>
          <label className="form-group">
            <span>Диаметр объектива</span>
            <input type="text" value={values.specs.diameter} onChange={setSpec('diameter')} placeholder="40" />
          </label>
        </div>
        <div className="form-row">
          <label className="form-group">
            <span>Вес, г</span>
            <input type="text" value={values.specs.weight} onChange={setSpec('weight')} placeholder="750" />
          </label>
          <label className="form-group">
            <span>Гарантия</span>
            <input type="text" value={values.specs.warranty} onChange={setSpec('warranty')} placeholder="1 год" />
          </label>
        </div>
      </fieldset>

      <div className="product-form-preview">
        <img src={asset(values.image)} alt="" width="90" height="70" />
        <div>
          <strong>{values.name || 'Название товара'}</strong>
          <div className="muted">
            {values.brand || 'Бренд не указан'} ·{' '}
            {values.price ? `${Number(values.price).toLocaleString('ru-RU')} ₽` : 'цена не указана'}
          </div>
        </div>
      </div>

      <div className="modal-footer product-form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" className="btn btn-primary">
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
