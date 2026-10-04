import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  IconButton,
  Pagination as MuiPagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import PageHeader from '../components/common/PageHeader';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import ProductFormDialog, { EMPTY_PRODUCT, validateProduct } from '../components/catalog/ProductFormDialog';
import { asset } from '../utils/asset';
import { formatPrice } from '../utils/format';

const PER_PAGE = 10;

/** Управление каталогом: создание, редактирование, удаление и множественный выбор. */
const ManagePage = () => {
  const { data } = useData();
  const {
    catalog,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteSelected,
    resetCatalog,
    selectedIds,
    toggleSelect,
    selectMany,
    clearSelection,
  } = useShop();

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(EMPTY_PRODUCT);
  const [errors, setErrors] = useState({});
  const [removing, setRemoving] = useState(null);
  const [bulkOpen, setBulkOpen] = useState(false);

  const brands = useMemo(
    () => [...new Set(catalog.map((product) => product.brand).filter(Boolean))].sort(),
    [catalog],
  );
  const images = useMemo(() => [...new Set(catalog.map((product) => product.image))], [catalog]);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return catalog;
    return catalog.filter((product) => `${product.name} ${product.brand ?? ''}`.toLowerCase().includes(text));
  }, [catalog, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const allVisibleSelected = visible.length > 0 && visible.every((product) => selectedIds.includes(product.id));

  const openCreate = () => {
    setEditing(null);
    setDraft({ ...EMPTY_PRODUCT, specs: { ...EMPTY_PRODUCT.specs } });
    setErrors({});
    setFormOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setDraft({
      ...EMPTY_PRODUCT,
      ...product,
      oldPrice: product.oldPrice ?? '',
      specs: { ...EMPTY_PRODUCT.specs, ...(product.specs ?? {}) },
    });
    setErrors({});
    setFormOpen(true);
  };

  const handleSubmit = () => {
    const validation = validateProduct(draft);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    const payload = {
      ...draft,
      price: Number(draft.price),
      oldPrice: draft.oldPrice ? Number(draft.oldPrice) : null,
      categoryId: Number(draft.categoryId),
    };

    if (editing) updateProduct(editing.id, payload);
    else addProduct(payload);
    setFormOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Управление каталогом"
        description="Добавление, редактирование и удаление объектов предметной области"
        breadcrumbs={[{ label: 'Управление каталогом' }]}
        actions={
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
              Добавить товар
            </Button>
            <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={resetCatalog}>
              Сбросить к JSON
            </Button>
          </Stack>
        }
      />

      <Container maxWidth="xl">
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
            <Autocomplete
              freeSolo
              options={catalog.map((product) => product.name)}
              inputValue={query}
              onInputChange={(_, value) => {
                setQuery(value);
                setPage(1);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Поиск по каталогу" size="small" sx={{ minWidth: 280 }} />
              )}
              sx={{ flex: 1 }}
            />
            <Chip label={`Выбрано: ${selectedIds.length}`} color="primary" />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button size="small" variant="outlined" onClick={() => selectMany(filtered.map((product) => product.id))}>
                Выбрать все ({filtered.length})
              </Button>
              <Button size="small" variant="outlined" onClick={clearSelection}>
                Снять выбор
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                disabled={!selectedIds.length}
                onClick={() => setBulkOpen(true)}
              >
                Удалить выбранные
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {visible.length === 0 ? (
          <EmptyState
            title="Ничего не найдено"
            text="Измените поисковый запрос или добавьте новый товар."
            action={
              <Button variant="contained" onClick={openCreate}>
                Добавить товар
              </Button>
            }
          />
        ) : (
          <>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={allVisibleSelected}
                        onChange={() =>
                          allVisibleSelected
                            ? clearSelection()
                            : selectMany([...new Set([...selectedIds, ...visible.map((product) => product.id)])])
                        }
                        inputProps={{ 'aria-label': 'Выбрать все строки' }}
                      />
                    </TableCell>
                    <TableCell>Фото</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Категория</TableCell>
                    <TableCell>Бренд</TableCell>
                    <TableCell align="right">Цена</TableCell>
                    <TableCell>Наличие</TableCell>
                    <TableCell align="right">Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visible.map((product) => {
                    const category = data.categories.find((item) => item.id === product.categoryId);
                    const selected = selectedIds.includes(product.id);
                    return (
                      <TableRow key={product.id} hover selected={selected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selected}
                            onChange={() => toggleSelect(product.id)}
                            inputProps={{ 'aria-label': `Выбрать ${product.name}` }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            component="img"
                            src={asset(product.image)}
                            alt=""
                            sx={{ width: 56, height: 42, objectFit: 'cover', borderRadius: 1 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            component={RouterLink}
                            to={`/product/${product.id}`}
                            variant="body2"
                            sx={{ color: 'text.primary', textDecoration: 'none' }}
                          >
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {product.id}
                          </Typography>
                        </TableCell>
                        <TableCell>{category?.name ?? '—'}</TableCell>
                        <TableCell>{product.brand ?? '—'}</TableCell>
                        <TableCell align="right">
                          {formatPrice(product.price)}
                          {product.oldPrice && (
                            <Typography variant="caption" display="block" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                              {formatPrice(product.oldPrice)}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label={product.inStock ? 'Есть' : 'Нет'}
                            color={product.inStock ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Редактировать">
                            <IconButton size="small" color="primary" onClick={() => openEdit(product)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <IconButton size="small" color="error" onClick={() => setRemoving(product)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack alignItems="center" sx={{ mt: 3 }}>
              <MuiPagination
                count={pageCount}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Stack>
          </>
        )}
      </Container>

      <ProductFormDialog
        open={formOpen}
        editing={editing}
        values={draft}
        errors={errors}
        categories={data.categories}
        brands={brands}
        images={images}
        onChange={(field, value) => setDraft((current) => ({ ...current, [field]: value }))}
        onSubmit={handleSubmit}
        onClose={() => setFormOpen(false)}
      />

      <ConfirmDialog
        open={Boolean(removing)}
        title="Удалить товар?"
        text={removing ? `Товар «${removing.name}» будет удалён из каталога.` : ''}
        onConfirm={() => {
          deleteProduct(removing.id);
          setRemoving(null);
        }}
        onCancel={() => setRemoving(null)}
      />

      <ConfirmDialog
        open={bulkOpen}
        title="Удалить выбранные товары?"
        text={`Будет удалено позиций: ${selectedIds.length}.`}
        onConfirm={() => {
          deleteSelected();
          setBulkOpen(false);
        }}
        onCancel={() => setBulkOpen(false)}
      />
    </>
  );
};

export default ManagePage;
