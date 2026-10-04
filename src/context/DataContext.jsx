import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { asset } from '../utils/asset';

/**
 * DataProvider — единая точка загрузки исходных данных приложения.
 * Все однотипные элементы (товары, категории, бренды, отзывы, баннеры, меню)
 * хранятся в JSON-файлах в public/data и загружаются асинхронно.
 */
export const DATA_FILES = [
  'products',
  'categories',
  'brands',
  'banners',
  'reviews',
  'users',
  'site',
  'navigation',
  'heroSlides',
  'features',
  'goods',
];

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(
        DATA_FILES.map((name) => fetch(asset(`data/${name}.json`))),
      );
      const failed = responses.find((response) => !response.ok);
      if (failed) {
        throw new Error(`Не удалось загрузить ${failed.url} (${failed.status})`);
      }
      const payloads = await Promise.all(responses.map((response) => response.json()));
      setData(Object.fromEntries(DATA_FILES.map((name, index) => [name, payloads[index]])));
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <DataContext.Provider value={{ data, loading, error, reload: load }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData должен вызываться внутри DataProvider');
  }
  return context;
};
