import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/index';
import {
  Routes,
  Route
} from 'react-router-dom';
import Inventory from './pages/Inventory';
import Products from './pages/Products';
import ProductTypes from './pages/ProductTypes';

const App = () => {

  return (
    <>
      <NavBar />
      <div className='inner-container'>
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productTypes" element={<ProductTypes />} />
        </Routes>
      </div>
    </>
  );
}

export default App;