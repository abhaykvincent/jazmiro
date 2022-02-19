import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import './App/App.scss';
//Redux 
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import productsReducer from './store/features/products'
import cartReducer from './store/features/cart'

//Store
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
