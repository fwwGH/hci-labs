import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/** Популярные категории: плитка из Card + CardActionArea. */
const CategoryGrid = ({ categories }) => (
  <Container maxWidth="xl" sx={{ mt: 5 }}>
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
      <Typography variant="h2" component="h2">
        Популярные категории
      </Typography>
      <Typography
        component={RouterLink}
        to="/catalog"
        variant="body2"
        sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', textDecoration: 'none' }}
      >
        Перейти в каталог <ChevronRightIcon fontSize="small" />
      </Typography>
    </Stack>

    <Grid container spacing={2}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={category.slug}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea
              component={RouterLink}
              to={`/catalog/${category.slug}`}
              sx={{ height: '100%', p: 1 }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="div" sx={{ fontSize: 34 }}>
                  {category.icon}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  {category.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {category.count} товаров
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default CategoryGrid;
