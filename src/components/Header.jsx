import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useData } from '../context/DataContext';
import HeaderTop from './HeaderTop';
import HeaderMain from './HeaderMain';
import MainNav from './MainNav';
import MobileMenu from './MobileMenu';

const STATIC_PAGES = [
  { title: 'Каталог', to: '/catalog' },
  { title: 'Управление товарами', to: '/manage' },
  { title: 'Избранное', to: '/favorites' },
  { title: 'Сравнение', to: '/compare' },
  { title: 'Корзина', to: '/cart' },
  { title: 'Просмотренные', to: '/viewed' },
  { title: 'О компании', to: '/about' },
  { title: 'Контакты', to: '/contacts' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { counters } = useShop();
  const { data } = useData();

  const organization = data?.site.organization ?? { name: 'Tele-Optics' };
  const navigation = data?.navigation ?? { catalogNav: [], topLinks: [], moreLinks: [], navMore: [], socials: [] };

  const mobileItems = [
    ...STATIC_PAGES.slice(0, 1),
    ...navigation.catalogNav.map((item) => ({ title: item.title, to: `/catalog/${item.slug}` })),
    ...STATIC_PAGES.slice(1),
  ];

  return (
    <>
      <HeaderTop
        organization={organization}
        topLinks={navigation.topLinks}
        moreLinks={navigation.moreLinks}
        socials={navigation.socials}
      />
      <HeaderMain
        organization={organization}
        counters={counters}
        menuOpen={menuOpen}
        onBurgerClick={() => setMenuOpen((open) => !open)}
      />
      <MainNav items={navigation.catalogNav} moreItems={navigation.navMore} />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        organization={organization}
        items={mobileItems}
      />
    </>
  );
};

export default Header;
