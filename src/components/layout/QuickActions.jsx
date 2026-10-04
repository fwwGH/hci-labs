import { useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CategoryIcon from '@mui/icons-material/Category';

/** Быстрые действия: набор SpeedDial в правом нижнем углу. */
const QuickActions = () => {
  const navigate = useNavigate();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 240 });

  const actions = [
    { name: 'Каталог', icon: <CategoryIcon />, run: () => navigate('/catalog') },
    { name: 'Вверх', icon: <KeyboardArrowUpIcon />, run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { name: 'Сравнение', icon: <CompareArrowsIcon />, run: () => navigate('/compare') },
    { name: 'Избранное', icon: <FavoriteIcon />, run: () => navigate('/favorites') },
    { name: 'Корзина', icon: <ShoppingCartIcon />, run: () => navigate('/cart') },
  ];

  return (
    <SpeedDial
      ariaLabel="Быстрые действия"
      sx={{ position: 'fixed', bottom: 24, right: 24, display: scrolled ? 'flex' : 'none' }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.run}
        />
      ))}
    </SpeedDial>
  );
};

export default QuickActions;
