/** Человекочитаемые названия характеристик товара (используются в карточке и модальном окне). */
export const SPEC_LABELS = {
  magnification: 'Увеличение',
  maxMagnification: 'Максимальное увеличение',
  diameter: 'Диаметр объектива',
  lensDiameter: 'Диаметр линзы',
  aperture: 'Апертура',
  objectives: 'Объективы',
  prism: 'Призма',
  coating: 'Просветление',
  minFocus: 'Минимальная дистанция фокусировки',
  fieldOfView: 'Поле зрения',
  eyeRelief: 'Удаление выходного зрачка',
  weight: 'Вес',
  waterproof: 'Водозащита',
  country: 'Страна производства',
  warranty: 'Гарантия',
  type: 'Тип',
  mount: 'Крепление',
  focalLength: 'Фокусное расстояние',
  light: 'Светосила',
  range: 'Диапазон измерения',
  maxRange: 'Максимальная дальность',
  accuracy: 'Точность',
  angleComp: 'Угломер',
  nightVision: 'Ночное видение',
  illumination: 'Подсветка',
  reticle: 'Прицельная сетка',
  tube: 'Труба',
  resolution: 'Разрешение',
  sensorSize: 'Размер сенсора',
  frameRate: 'Частота кадров',
  battery: 'Питание',
  foldable: 'Складная конструкция',
};

export const specEntries = (specs = {}) =>
  Object.entries(specs).map(([key, value]) => ({
    key,
    label: SPEC_LABELS[key] ?? key,
    value: String(value),
  }));

export const UNIT_SUFFIX = {
  weight: ' г',
  fieldOfView: '°',
  minFocus: ' м',
  focalLength: ' мм',
  maxRange: ' м',
  range: ' м',
  lensDiameter: ' мм',
  diameter: ' мм',
  frameRate: ' fps',
};
