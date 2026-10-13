import { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Alert, Box, Button, Container, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { getTheme } from './theme';
import { useData } from './context/DataContext';
import AppHeader from './components/layout/AppHeader';
import AppFooter from './components/layout/AppFooter';
import ScrollToTop from './components/layout/ScrollToTop';
import QuickActions from './components/layout/QuickActions';
import CompareBar from './components/common/CompareBar';
import Notifications from './components/common/Notifications';
import LoadingState from './components/common/LoadingState';
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

const MODE_KEY = 'tele-optics:theme-mode';

const App = () => {
  const { data, loading, error, reload } = useData();
  const [mode, setMode] = useState(() => window.localStorage.getItem(MODE_KEY) ?? 'light');

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleMode = () =>
    setMode((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      window.localStorage.setItem(MODE_KEY, next);
      return next;
    });

  const renderBody = () => {
    if (loading) {
      return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <LoadingState />
        </Container>
      );
    }

    if (error || !data) {
      return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Не удалось загрузить данные приложения: {error}
          </Alert>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Проверьте, что JSON-файлы находятся в <code>public/data</code>, и запустите приложение
            командой <code>npm run dev</code>.
          </Typography>
          <Button variant="contained" onClick={reload}>
            Повторить загрузку
          </Button>
        </Container>
      );
    }

    return (
      <>
        <AppHeader mode={mode} onToggleMode={toggleMode} />
        <Box component="main" sx={{ flex: 1, pb: 6 }}>
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
        </Box>
        <CompareBar />
        <AppFooter organization={data.site.organization} navigation={data.navigation} />
        <QuickActions />
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        {renderBody()}
        <Notifications />
      </Box>
    </ThemeProvider>
  );
};

export default App;
