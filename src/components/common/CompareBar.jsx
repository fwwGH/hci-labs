import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Chip, Container, Paper, Stack, Typography } from '@mui/material';
import { useShop } from '../../context/ShopContext';

/** Панель сравнения: закреплена снизу и видна на всех страницах. */
const CompareBar = () => {
  const { compare, getProduct } = useShop();
  const products = compare.map(getProduct).filter(Boolean);

  if (!products.length) return null;

  return (
    <Paper
      square
      elevation={8}
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: (theme) => theme.zIndex.appBar - 1,
        py: 1,
        bgcolor: 'primary.dark',
        color: 'primary.contrastText',
      }}
    >
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap" useFlexGap>
          <Typography variant="subtitle2">В сравнении: {products.length}</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ flex: 1, overflow: 'hidden' }}>
            {products.slice(0, 4).map((product) => (
              <Chip
                key={product.id}
                label={product.name}
                size="small"
                sx={{ maxWidth: 220, bgcolor: 'rgba(255,255,255,.16)', color: 'inherit' }}
              />
            ))}
            {products.length > 4 && <Chip size="small" label={`+${products.length - 4}`} color="secondary" />}
          </Stack>
          <Box>
            <Button component={RouterLink} to="/compare" variant="contained" color="secondary" size="small">
              Сравнить
            </Button>
          </Box>
        </Stack>
      </Container>
    </Paper>
  );
};

export default CompareBar;
