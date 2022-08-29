import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {combineReducers, configureStore} from '@reduxjs/toolkit'
import cubeSlice from './redux/cubeSlice';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
   cubeSlice: cubeSlice
})

export const store = configureStore({
    reducer: rootReducer
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> <App/> </Provider>
  </React.StrictMode>
)

reportWebVitals();
