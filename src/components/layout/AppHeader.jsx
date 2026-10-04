import { useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import LoginIcon from '@mui/icons-material/Login';
import { useData } from '../../context/DataContext';
import { useShop } from '../../context/ShopContext';

const NAV_ITEMS = [
  { title: 'Каталог', to: '/catalog' },
  { title: 'Управление каталогом', to: '/manage' },
  { title: 'Избранное', to: '/favorites' },
  { title: 'Сравнение', to: '/compare' },
  { title: 'Корзина', to: '/cart' },
  { title: 'Просмотренные', to: '/viewed' },
  { title: 'О компании', to: '/about' },
  { title: 'Контакты', to: '/contacts' },
];

/** Шапка приложения: AppBar, поиск с автодополнением, профиль, тема, меню категорий. */
const AppHeader = ({ mode, onToggleMode }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  const { data, loading } = useData();
  const { counters, notify } = useShop();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [query, setQuery] = useState('');

  const products = data?.products ?? [];
  const categories = data?.categories ?? [];
  const user = data?.users?.[0];

  const options = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (text.length < 2) return [];
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(text) || (product.brand ?? '').toLowerCase().includes(text),
      )
      .slice(0, 8);
  }, [products, query]);

  const goToCatalog = () => {
    if (query.trim()) navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
    else navigate('/catalog');
    setQuery('');
  };

  const badgeButtons = [
    { key: 'viewed', label: 'Просмотренные', to: '/viewed', icon: <VisibilityIcon /> },
    { key: 'compare', label: 'Сравнение', to: '/compare', icon: <CompareArrowsIcon /> },
    { key: 'favorites', label: 'Избранное', to: '/favorites', icon: <FavoriteIcon /> },
    { key: 'cart', label: 'Корзина', to: '/cart', icon: <ShoppingCartIcon />, color: 'secondary' },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
    >
      <Toolbar sx={{ gap: 1, minHeight: { xs: 64, md: 76 }, px: { xs: 1.5, md: 3 } }}>
        {!isDesktop && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Открыть меню"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          sx={{ fontWeight: 900, color: 'primary.main', textDecoration: 'none', letterSpacing: '-0.02em' }}
        >
          TELE-OPTICS
        </Typography>

        <Autocomplete
          freeSolo
          sx={{ flex: 1, maxWidth: 520, display: { xs: 'none', sm: 'block' } }}
          size="small"
          options={options}
          loading={loading}
          value={null}
          inputValue={query}
          onInputChange={(_, value) => setQuery(value)}
          onChange={(_, value) => {
            if (value && typeof value === 'object') {
              navigate(`/product/${value.id}`);
              setQuery('');
            }
          }}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
          filterOptions={(items) => items}
          noOptionsText="Ничего не найдено"
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Поиск: бинокль, телескоп, Veber…"
              onKeyDown={(event) => {
                if (event.key === 'Enter') goToCatalog();
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Box sx={{ flexGrow: { xs: 1, sm: 0 } }} />

        <Tooltip title={mode === 'light' ? 'Тёмная тема' : 'Светлая тема'}>
          <FormControlLabel
            sx={{ mr: 0 }}
            control={
              <Switch
                checked={mode === 'dark'}
                onChange={onToggleMode}
                inputProps={{ 'aria-label': 'Переключить тему' }}
              />
            }
            label={mode === 'dark' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
            labelPlacement="start"
          />
        </Tooltip>

        {badgeButtons.map((button) => (
          <Tooltip key={button.key} title={button.label}>
            <IconButton component={RouterLink} to={button.to} color={button.color ?? 'inherit'} aria-label={button.label}>
              <Badge badgeContent={counters[button.key]} color="primary">
                {button.icon}
              </Badge>
            </IconButton>
          </Tooltip>
        ))}

        <Tooltip title={`${user?.name ?? 'Гость'} — профиль`}>
          <IconButton onClick={(event) => setProfileAnchor(event.currentTarget)} aria-label="Профиль">
            <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14 }}>
              {user?.name?.slice(0, 1) ?? 'Г'}
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={() => setProfileAnchor(null)}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2">{user?.name ?? 'Гость'}</Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email ?? 'войдите в личный кабинет'}
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            onClick={() => {
              setProfileAnchor(null);
              navigate('/favorites');
            }}
          >
            <FavoriteIcon fontSize="small" sx={{ mr: 1 }} /> Избранное
          </MenuItem>
          <MenuItem
            onClick={() => {
              setProfileAnchor(null);
              navigate('/cart');
            }}
          >
            <ShoppingCartIcon fontSize="small" sx={{ mr: 1 }} /> Корзина
          </MenuItem>
          <MenuItem
            onClick={() => {
              setProfileAnchor(null);
              notify('Личный кабинет появится в следующих лабораторных работах', 'info');
            }}
          >
            <LoginIcon fontSize="small" sx={{ mr: 1 }} /> Войти в кабинет
          </MenuItem>
        </Menu>
      </Toolbar>

      <Divider />

      <Box sx={{ display: { xs: 'none', md: 'block' }, bgcolor: 'background.paper' }}>
        <Tabs
          value={false}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, minHeight: 46 }}
        >
          <Tab component={RouterLink} to="/catalog" label="Весь каталог" sx={{ minHeight: 46 }} />
          {categories.map((category) => (
            <Tab
              key={category.slug}
              component={RouterLink}
              to={`/catalog/${category.slug}`}
              label={category.name}
              sx={{ minHeight: 46 }}
            />
          ))}
          <Tab component={RouterLink} to="/manage" label="Управление" sx={{ minHeight: 46 }} />
        </Tabs>
      </Box>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 2 }} role="presentation">
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <PhoneIcon color="primary" fontSize="small" />
            <Typography variant="subtitle2">{data?.site.organization.phone}</Typography>
          </Stack>
          <Chip label={data?.site.organization.city ?? 'Москва'} size="small" sx={{ mb: 2 }} />
          <List>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <Typography variant="overline" sx={{ pl: 2 }}>
            Категории
          </Typography>
          <List dense>
            {categories.map((category) => (
              <ListItemButton
                key={category.slug}
                component={RouterLink}
                to={`/catalog/${category.slug}`}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={category.name} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default AppHeader;
