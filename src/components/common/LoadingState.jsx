import { Box, Card, CardContent, Grid, LinearProgress, Skeleton, Typography } from '@mui/material';

/** Состояние загрузки данных: LinearProgress и skeleton-карточки Material UI. */
const LoadingState = ({ text = 'Загружаем каталог из JSON-файлов…' }) => (
  <Box>
    <LinearProgress sx={{ mb: 3, borderRadius: 1 }} />
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      {text}
    </Typography>
    <Grid container spacing={2}>
      {Array.from({ length: 8 }, (_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={160} />
            <CardContent>
              <Skeleton width="40%" />
              <Skeleton width="90%" />
              <Skeleton width="60%" />
              <Skeleton variant="rounded" height={36} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default LoadingState;
