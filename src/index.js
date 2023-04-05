import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LockerInfo from './pages/LockerInfo';
import Header from './components/Layout/Header';
import { Web3Provider } from './context/Web3Provider';
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Web3Provider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="locker/:lockerAddress" element={<LockerInfo />} />
      </Routes>
    </Web3Provider>
  </BrowserRouter>
);
