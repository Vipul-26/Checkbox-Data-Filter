import React from 'react';
import Header from './components/Header/index';
import ClothingAndAccessories from './components/ClothingAndAccessories';
import Footer from './components/Footer/index';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <ClothingAndAccessories />
      <Footer />
    </div>
  );
};

export default App;
