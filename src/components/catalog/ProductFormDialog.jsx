import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  specs: { magnification: '', diameter: '', weight: '', warranty: '1 год' },
};

/** Валидация формы: возвращает объект ошибок по полям. */
export const validateProduct = (values) => {
  const errors = {};
  if (!values.name || values.name.trim().length < 3) errors.name = 'Минимум 3 символа';
  if (!values.categoryId) errors.categoryId = 'Выберите категорию';
  if (!values.price || Number(values.price) <= 0) errors.price = 'Цена должна быть больше нуля';
  if (values.oldPrice && Number(values.oldPrice) < Number(values.price)) {
    errors.oldPrice = 'Старая цена меньше новой';
  }
  return errors;
};

/**
 * Модальная форма добавления/редактирования товара (Dialog + TextField +
 * Select + Switch + Accordion). Используется на странице управления каталогом.
 */
const ProductFormDialog = ({
  open,
  editing,
  values,
  errors = {},
  categories,
  brands,
  images,
  onChange,
  onSubmit,
  onClose,
}) => {
  const setField = (field) => (event) => {
    const target = event.target;
    onChange(field, target.type === 'checkbox' ? target.checked : target.value);
  };

  const setSpec = (field) => (event) => onChange('specs', { ...values.specs, [field]: event.target.value });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{editing ? `Редактирование: ${editing.name}` : 'Новый товар'}</DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={(event) => event.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Название *"
                value={values.name}
                onChange={setField('name')}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Autocomplete
                freeSolo
                options={brands}
                value={values.brand}
                onInputChange={(_, value) => onChange('brand', value)}
                renderInput={(params) => <TextField {...params} label="Бренд" />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth error={Boolean(errors.categoryId)}>
                <InputLabel id="form-category">Категория *</InputLabel>
                <Select
                  labelId="form-category"
                  label="Категория *"
                  value={values.categoryId}
                  onChange={setField('categoryId')}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.categoryId && (
                  <Typography variant="caption" color="error">
                    {errors.categoryId}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="form-image">Изображение</InputLabel>
                <Select labelId="form-image" label="Изображение" value={values.image} onChange={setField('image')}>
                  {images.map((image) => (
                    <MenuItem key={image} value={image}>
                      {image.replace('assets/images/', '')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={2}>
              <TextField
                fullWidth
                type="number"
                label="Цена, ₽ *"
                value={values.price}
                onChange={setField('price')}
                error={Boolean(errors.price)}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                fullWidth
                type="number"
                label="Старая цена"
                value={values.oldPrice}
                onChange={setField('oldPrice')}
                error={Boolean(errors.oldPrice)}
                helperText={errors.oldPrice}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <FormControlLabel
                  control={<Switch checked={values.inStock} onChange={setField('inStock')} />}
                  label="В наличии"
                />
                <FormControlLabel
                  control={<Switch checked={values.isHit} onChange={setField('isHit')} />}
                  label="Хит продаж"
                />
                <FormControlLabel
                  control={<Switch checked={values.isNew} onChange={setField('isNew')} />}
                  label="Новинка"
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Accordion variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Характеристики товара</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Увеличение"
                        value={values.specs.magnification}
                        onChange={setSpec('magnification')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Диаметр объектива"
                        value={values.specs.diameter}
                        onChange={setSpec('diameter')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Вес, г" value={values.specs.weight} onChange={setSpec('weight')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Гарантия"
                        value={values.specs.warranty}
                        onChange={setSpec('warranty')}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={onSubmit} variant="contained">
          {editing ? 'Сохранить изменения' : 'Добавить товар'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;
