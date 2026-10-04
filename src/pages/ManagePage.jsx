import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useShop } from '../context/ShopContext';
import PageHeader from '../components/common/PageHeader';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import ProductForm, { EMPTY_PRODUCT, validateProduct } from '../components/catalog/ProductForm';
import { asset } from '../utils/asset';
import { formatPrice } from '../utils/format';

const PER_PAGE = 10;

/** Управление каталогом: добавление, редактирование, удаление и множественный выбор. */
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
  const [bulkRemoveOpen, setBulkRemoveOpen] = useState(false);

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

  const handleChange = (field, value) => setDraft((current) => ({ ...current, [field]: value }));

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

    if (editing) {
      updateProduct(editing.id, payload);
    } else {
      addProduct(payload);
    }
    setFormOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Управление каталогом"
        description="Добавление, редактирование и удаление объектов предметной области"
        breadcrumbs={[{ label: 'Управление каталогом' }]}
        actions={
          <div className="bulk-actions">
            <button type="button" className="btn btn-primary btn-sm" onClick={openCreate}>
              + Добавить товар
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={resetCatalog}>
              Сбросить к данным из JSON
            </button>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <div className="manage-toolbar">
            <label className="field field--search">
              <span className="field-label">Поиск по каталогу</span>
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Название или бренд"
              />
            </label>

            <div className="selection-panel selection-panel--inline">
              <span className="selection-count">Выбрано: {selectedIds.length}</span>
              <div className="selection-actions">
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => selectMany(filtered.map((product) => product.id))}
                >
                  Выбрать все ({filtered.length})
                </button>
                <button type="button" className="btn btn-outline btn-sm" onClick={clearSelection}>
                  Снять выбор
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm btn-danger"
                  disabled={!selectedIds.length}
                  onClick={() => setBulkRemoveOpen(true)}
                >
                  Удалить выбранные
                </button>
              </div>
            </div>
          </div>

          {visible.length === 0 ? (
            <EmptyState
              title="Ничего не найдено"
              text="Измените поисковый запрос или добавьте новый товар."
              action={
                <button type="button" className="btn btn-primary" onClick={openCreate}>
                  Добавить товар
                </button>
              }
            />
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="data-table-check">
                      <input
                        type="checkbox"
                        checked={allVisibleSelected}
                        aria-label="Выбрать все строки"
                        onChange={() =>
                          allVisibleSelected
                            ? clearSelection()
                            : selectMany([...new Set([...selectedIds, ...visible.map((product) => product.id)])])
                        }
                      />
                    </th>
                    <th>Фото</th>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Бренд</th>
                    <th>Цена</th>
                    <th>Наличие</th>
                    <th className="data-table-actions">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((product) => {
                    const category = data.categories.find((item) => item.id === product.categoryId);
                    const isSelected = selectedIds.includes(product.id);
                    return (
                      <tr key={product.id} className={isSelected ? 'row-selected' : undefined}>
                        <td className="data-table-check">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(product.id)}
                            aria-label={`Выбрать ${product.name}`}
                          />
                        </td>
                        <td>
                          <img src={asset(product.image)} alt="" width="54" height="42" loading="lazy" />
                        </td>
                        <td>
                          <Link to={`/product/${product.id}`}>{product.name}</Link>
                          <div className="muted">ID: {product.id}</div>
                        </td>
                        <td>{category?.name ?? '—'}</td>
                        <td>{product.brand ?? '—'}</td>
                        <td>
                          {formatPrice(product.price)}
                          {product.oldPrice && (
                            <div className="muted text-strike">{formatPrice(product.oldPrice)}</div>
                          )}
                        </td>
                        <td>
                          <span className={`chip${product.inStock ? ' chip--success' : ' chip--danger'}`}>
                            {product.inStock ? 'Есть' : 'Нет'}
                          </span>
                        </td>
                        <td className="data-table-actions">
                          <button type="button" className="btn btn-outline btn-sm" onClick={() => openEdit(product)}>
                            Изменить
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm btn-danger"
                            onClick={() => setRemoving(product)}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </section>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? `Редактирование: ${editing.name}` : 'Новый товар'}
        size="lg"
      >
        <ProductForm
          values={draft}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
          categories={data.categories}
          brands={brands}
          images={images}
          submitText={editing ? 'Сохранить изменения' : 'Добавить товар'}
        />
      </Modal>

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
        open={bulkRemoveOpen}
        title="Удалить выбранные товары?"
        text={`Будет удалено позиций: ${selectedIds.length}.`}
        onConfirm={() => {
          deleteSelected();
          setBulkRemoveOpen(false);
        }}
        onCancel={() => setBulkRemoveOpen(false)}
      />
    </>
  );
};

export default ManagePage;
