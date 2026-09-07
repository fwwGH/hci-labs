// src/App.jsx
import React, { Component } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CategoriesGrid from './components/CategoriesGrid';
import ProductsSection from './components/ProductsSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import { ORGANIZATION, PAGE_TITLE, categories, products, banners } from './data/db';

// Корневой классовый компонент приложения.
// Данные (организация, заголовок, массивы объектов) передаются
// дочерним компонентам через props.
class App extends Component {
  render() {
    return (
      <div className="app">
        <Header organization={ORGANIZATION} />
        <main className="container">
          <HeroSlider pageTitle={PAGE_TITLE} banners={banners} />
          <CategoriesGrid categories={categories} />
          <ProductsSection products={products} />
          <AboutSection organization={ORGANIZATION} />
          <Footer organization={ORGANIZATION} />
        </main>
      </div>
    );
  }
}

export default App;
