import { asset } from '../utils/asset';

const Icon = ({ name, size }) => (
  <img
    className={size ? `ui-icon ui-icon-${size}` : 'ui-icon'}
    src={asset(`assets/icons/${name}.svg`)}
    alt=""
    aria-hidden="true"
  />
);

export default Icon;
