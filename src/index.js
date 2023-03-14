import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import LockerInfo from './pages/LockerInfo';
import Header from './components/Layout/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="locker/:lockerAddress" element={<LockerInfo />} />
    </Routes>
  </BrowserRouter>
);
