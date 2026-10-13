import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

/** Полоса акций: карточки с предложениями из banners.json. */
const PromoBanners = ({ banners }) => (
  <Container maxWidth="xl" sx={{ mt: 4 }}>
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
      <LocalOfferIcon color="secondary" />
      <Typography variant="h2" component="h2">
        Акции и спецпредложения
      </Typography>
    </Stack>

    <Grid container spacing={2}>
      {banners.map((banner) => (
        <Grid item xs={12} md={6} key={banner.id}>
          <Card
            sx={{
              height: '100%',
              color: '#fff',
              background: 'linear-gradient(135deg, #1f5fbf 0%, #16386f 100%)',
              '&:hover': { transform: 'none' },
            }}
          >
            <CardContent sx={{ display: 'grid', gap: 1.5 }}>
              <Chip
                label="Выгодное предложение"
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,.2)', color: '#fff', justifySelf: 'start' }}
              />
              <Typography variant="h3" component="h3">
                {banner.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {banner.subtitle}
              </Typography>
              <Stack direction="row" alignItems="baseline" spacing={2}>
                <Typography sx={{ textDecoration: 'line-through', opacity: 0.75 }}>{banner.oldPrice} ₽</Typography>
                <Typography variant="h2" sx={{ fontWeight: 800 }}>
                  {banner.newPrice} ₽
                </Typography>
              </Stack>
              <Box>
                <Button
                  component={RouterLink}
                  to={`/product/${banner.productId}`}
                  variant="contained"
                  color="secondary"
                >
                  {banner.btnText}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default PromoBanners;
