import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Dashboard from './components/admin/Dashboard'
import ProductManagement from './components/admin/ProductManagement'
import OrderItem from './components/admin/OrderItem'
import Cart from './components/users/Cart'
import Product from './components/users/Product'
import Login from './components/users/Login'
import Signup from './components/users/Signup'
import Success from './components/users/Success'
import React, { useState } from 'react';
export const CartContext = React.createContext();

function App() {
  let [cart,setCart] = useState([])
  return<>
      <BrowserRouter>
      <CartContext.Provider value={{cart,setCart}}>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/product-management' element={<ProductManagement/>}/>
            <Route path='/dashboard/:id' element={<OrderItem/>}/>
            <Route path='/user-cart' element={<Cart/>}/>
            <Route path='/user-menu' element={<Product/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/order-success' element={<Success/>}/>
            <Route path='*' element={<Navigate to='/login'/>}/>
          </Routes>
          </CartContext.Provider>
      </BrowserRouter>
  </>
}

export default App;