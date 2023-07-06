import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/index';
import {
  Routes,
  Route
} from 'react-router-dom';
import Warehouses from './pages/Warehouses';
import Products from './pages/Products';
import ProductTypes from './pages/ProductTypes';

const App = () => {

  return (
    <>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productTypes" element={<ProductTypes />} />
        </Routes>
      </div>
    </>
  );
}

export default App;