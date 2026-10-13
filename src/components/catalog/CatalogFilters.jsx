import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InputAdornment from '@mui/material/InputAdornment';

export const SORT_OPTIONS = [
  { id: 'popular', title: 'По популярности' },
  { id: 'price-asc', title: 'Сначала дешёвые' },
  { id: 'price-desc', title: 'Сначала дорогие' },
  { id: 'rating', title: 'По рейтингу' },
  { id: 'name', title: 'По названию' },
];

/**
 * Панель фильтров каталога на компонентах Material UI:
 * TextField, Select, Slider (диапазон цен), Switch и ToggleButtonGroup.
 */
const CatalogFilters = ({ values, onChange, onReset, categories, brands, priceBounds, total }) => (
  <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Поиск по названию или бренду"
          value={values.query}
          onChange={(event) => onChange('query', event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2.6}>
        <FormControl fullWidth size="small">
          <InputLabel id="category-label">Категория</InputLabel>
          <Select
            labelId="category-label"
            label="Категория"
            value={values.category}
            onChange={(event) => onChange('category', event.target.value)}
          >
            <MenuItem value="">Все категории</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.slug} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={2.6}>
        <FormControl fullWidth size="small">
          <InputLabel id="brand-label">Бренд</InputLabel>
          <Select
            labelId="brand-label"
            label="Бренд"
            value={values.brand}
            onChange={(event) => onChange('brand', event.target.value)}
          >
            <MenuItem value="">Все бренды</MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand} value={brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={2.8}>
        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          value={values.sort}
          onChange={(_, value) => value && onChange('sort', value)}
          aria-label="Сортировка"
        >
          {SORT_OPTIONS.map((option) => (
            <ToggleButton key={option.id} value={option.id} sx={{ fontSize: 12, textTransform: 'none' }}>
              {option.title.replace('Сначала ', '')}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>

      <Grid item xs={12} md={5}>
        <Typography variant="caption" color="text.secondary">
          Цена, ₽: {values.priceRange[0].toLocaleString('ru-RU')} — {values.priceRange[1].toLocaleString('ru-RU')}
        </Typography>
        <Slider
          value={values.priceRange}
          onChange={(_, value) => onChange('priceRange', value)}
          min={priceBounds.min}
          max={priceBounds.max}
          step={500}
          valueLabelDisplay="auto"
          sx={{ mt: 1 }}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
          <FormControlLabel
            control={
              <Switch
                checked={values.inStockOnly}
                onChange={(event) => onChange('inStockOnly', event.target.checked)}
              />
            }
            label="В наличии"
          />
          <FormControlLabel
            control={
              <Switch checked={values.saleOnly} onChange={(event) => onChange('saleOnly', event.target.checked)} />
            }
            label="Со скидкой"
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
          <Chip label={`Найдено: ${total}`} color="primary" variant="outlined" />
          <Button onClick={onReset} startIcon={<RestartAltIcon />} size="small">
            Сбросить фильтры
          </Button>
        </Stack>
      </Grid>
    </Grid>

    <Box sx={{ mt: 1 }}>
      <Typography variant="caption" color="text.secondary">
        Фильтры применяются мгновенно и хранятся в состоянии страницы (React state).
      </Typography>
    </Box>
  </Paper>
);

export default CatalogFilters;
