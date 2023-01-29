import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Search from './pages/Search/Search';
import FlightDetails from './pages/FlightDetails/FlightDetails';

import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search/>
  },
  {
    path: '/catch/:flightNum',
    element: <FlightDetails/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer/>
  </React.StrictMode>
);

reportWebVitals();