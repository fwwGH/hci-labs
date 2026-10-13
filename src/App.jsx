import { Route, Routes } from 'react-router-dom';
import { useData } from './context/DataContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CompareBar from './components/common/CompareBar';
import ToastStack from './components/common/ToastStack';
import ScrollToTop from './components/common/ScrollToTop';
import Loader from './components/common/Loader';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import FavoritesPage from './pages/FavoritesPage';
import ComparePage from './pages/ComparePage';
import CartPage from './pages/CartPage';
import ViewedPage from './pages/ViewedPage';
import ManagePage from './pages/ManagePage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const { data, loading, error, reload } = useData();

  if (loading) {
    return (
      <div className="app-state">
        <Loader text="Загружаем каталог из JSON-файлов…" skeletonCount={4} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="app-state">
        <h1 className="app-state-title">Не удалось загрузить данные</h1>
        <p className="app-state-text">{error}</p>
        <p className="app-state-text">
          Проверьте, что файлы лежат в <code>public/data</code>, и запустите приложение командой{' '}
          <code>npm run dev</code>.
        </p>
        <button type="button" className="btn btn-primary" onClick={reload}>
          Повторить загрузку
        </button>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:slug" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/viewed" element={<ViewedPage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <CompareBar />
      <Footer organization={data.site.organization} navigation={data.navigation} />
      <ToastStack />
    </div>
  );
};

export default App;
