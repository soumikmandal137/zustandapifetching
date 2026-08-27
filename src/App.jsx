// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './compound/product/Product';


import ProductList from './compound/product/Product';
import Productdetails from './compound/productlist/Productlist';

function App() {


  return (
<>
  <Router>
      <Routes>
         <Route
          path="/"
          element={<ProductList />}
        />

        <Route
          path="/products/:id"
          element={<Productdetails />}
        />

      </Routes>
    </Router>
</>
  )
}

export default App
