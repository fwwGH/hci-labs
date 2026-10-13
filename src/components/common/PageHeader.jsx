import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Container, Link as MuiLink, Stack, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

/** Заголовок внутренней страницы: хлебные крошки, название, описание и действия. */
const PageHeader = ({ title, description, breadcrumbs = [], actions, children }) => (
  <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', py: 3, mb: 3 }}>
    <Container maxWidth="xl">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 1 }}>
        <MuiLink component={RouterLink} to="/" underline="hover" color="text.secondary" variant="body2">
          Главная
        </MuiLink>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return isLast || !item.to ? (
            <Typography key={item.label} variant="body2" color="text.primary">
              {item.label}
            </Typography>
          ) : (
            <MuiLink
              key={item.label}
              component={RouterLink}
              to={item.to}
              underline="hover"
              color="text.secondary"
              variant="body2"
            >
              {item.label}
            </MuiLink>
          );
        })}
      </Breadcrumbs>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Box>
          <Typography variant="h1" component="h1">
            {title}
          </Typography>
          {description && (
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
        {actions && <Box>{actions}</Box>}
      </Stack>

      {children}
    </Container>
  </Box>
);

export default PageHeader;
