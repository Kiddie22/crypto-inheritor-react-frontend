import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LockerInfo from './pages/LockerInfo';
import Layout from './components/Layout/Layout';
import { Web3Provider } from './context/Web3Provider';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Lockers from './pages/Lockers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Web3Provider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lockers" element={<Lockers />} />
          <Route
            path="/lockers/locker/:lockerAddress"
            element={<LockerInfo />}
          />
        </Route>
      </Routes>
    </Web3Provider>
  </BrowserRouter>
);
