import { useData } from '../context/DataContext';
import PageHeader from '../components/common/PageHeader';
import About from '../components/About';
import Features from '../components/Features';
import Brands from '../components/Brands';

/** Страница «О компании» — переиспользует блоки главной страницы. */
const AboutPage = () => {
  const { data } = useData();
  const { site, features, brands } = data;

  return (
    <>
      <PageHeader
        title="О компании"
        description="История, цели и преимущества магазина Tele-Optics"
        breadcrumbs={[{ label: 'О компании' }]}
      />
      <About
        title={site.pageTitle}
        text={site.about.text}
        goalsIntro={site.about.goalsIntro}
        goals={site.about.goals}
      />
      <Features items={features} />
      <Brands title="Наши партнёры" brands={brands} />
    </>
  );
};

export default AboutPage;
