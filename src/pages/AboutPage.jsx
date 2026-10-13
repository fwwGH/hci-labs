import { Chip, Container, Stack } from '@mui/material';
import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import AboutSection from '../components/home/AboutSection';
import FeatureList from '../components/home/FeatureList';

/** Страница «О компании»: переиспользует блоки главной страницы. */
const AboutPage = () => {
  const { data } = useData();

  return (
    <>
      <PageHeader
        title="О компании"
        description="История, цели и преимущества магазина Tele-Optics"
        breadcrumbs={[{ label: 'О компании' }]}
      />
      <AboutSection
        title={data.site.pageTitle}
        text={data.site.about.text}
        goalsIntro={data.site.about.goalsIntro}
        goals={data.site.about.goals}
      />
      <FeatureList features={data.features} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {data.brands.map((brand) => (
            <Chip key={brand.id} label={brand.name} variant="outlined" color="primary" />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default AboutPage;
