import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
// require('dotenv').config()



function App() {
const productApi = process.env.REACT_APP_PRODUCT_API_URL
  return (
    <>
      <Router>
    
       <Navbar></Navbar>

       <Routes>
          <Route path="/product/:id" element={<ProductDetails/>}>
            
          </Route>
          <Route path="/" element={<Products productApi = {productApi} />}>
          </Route>
      </Routes>


      </Router>
    
    </>
  );
}

export default App;
