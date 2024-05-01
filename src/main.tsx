import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import App from './App';
import { store } from './app/store'
import {Provider, useSelector} from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';





ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="522705329788-vg8pg8hd2cmbsobpr2daungv7sli0qbm.apps.googleusercontent.com">
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path="/*" element={<App/>}/>
          </Routes>
      </BrowserRouter>
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);