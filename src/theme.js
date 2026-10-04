import { createTheme } from '@mui/material/styles';

/**
 * Единая тема приложения на основе Material UI.
 * Светлая и тёмная схемы собираются из одной фабрики, поэтому внешний вид
 * всех страниц остаётся согласованным в обоих режимах.
 */
const brand = {
  primary: '#1f5fbf',
  secondary: '#f2a33c',
  success: '#1a7f42',
  error: '#c0392b',
};

const typography = {
  fontFamily: '"Inter", "Segoe UI", Roboto, Arial, sans-serif',
  h1: { fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)', fontWeight: 800 },
  h2: { fontSize: '1.4rem', fontWeight: 700 },
  h3: { fontSize: '1.15rem', fontWeight: 700 },
  button: { textTransform: 'none', fontWeight: 600 },
};

const shape = { borderRadius: 12 };

const components = {
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: { root: { borderRadius: 10, paddingInline: 18 } },
  },
  MuiCard: {
    defaultProps: { elevation: 0 },
    styleOverrides: {
      root: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        transition: 'transform .18s ease, box-shadow .18s ease',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: theme.shadows[6] },
      }),
    },
  },
  MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  MuiAppBar: { defaultProps: { elevation: 0, color: 'default' } },
  MuiTableCell: { styleOverrides: { head: { fontWeight: 700, whiteSpace: 'nowrap' } } },
  MuiAccordion: { defaultProps: { disableGutters: true, elevation: 0 } },
};

export const getTheme = (mode) => {
  const isLight = mode === 'light';

  return createTheme({
    palette: {
      mode,
      primary: { main: brand.primary },
      secondary: { main: brand.secondary },
      success: { main: brand.success },
      error: { main: brand.error },
      background: isLight
        ? { default: '#f4f6fb', paper: '#ffffff' }
        : { default: '#0f1621', paper: '#17202e' },
    },
    typography,
    shape,
    components,
  });
};

export default getTheme;
