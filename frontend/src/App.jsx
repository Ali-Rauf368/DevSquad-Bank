import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Products from './components/Products';
import News from './components/News';
import Guide from './components/Guide';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Registration from './components/Registration';
import UserProfile from "./components/UserProfile";
import Transaction from "./components/Transaction";
import Dashboard from './components/Dashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { BalanceProvider } from './components/BalanceContext';
import MovingAd from './components/MovingAd'; 
import ImageSlider from './components/ImageSlider';
import Chatbot from './components/Chatbot';
import MarketingDashboard from './components/MarketingDashboard';
import UserLoanRequest from './components/UserLoanRequest';
import VideoPlayer from './components/Video';
import UserProtectedRoute from './components/UserProtectedRoute'; 

import './App.css';

const App = () => {
  // Check if admin is logged in
  const isAdminLoggedIn = !!localStorage.getItem("adminToken");

  return (
    <BalanceProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={
              <>
                <NavBar />
                <MovingAd />
                <VideoPlayer />
                <ImageSlider />
                <div id="products" className="section">
                  <Products />
                </div>
                <div id="news" className="section">
                  <News />
                </div>
                <div id="guide" className="section">
                  <Guide />
                </div>
                <div id="about-us" className="section">
                  <AboutUs />
                </div>
                <Chatbot />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/offers" element={<MarketingDashboard />} /> 
            <Route path="/loan-request" element={<UserLoanRequest />} />  

            {/* Protected Routes */}
            <Route element={<UserProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/transaction/*" element={<Transaction />} />
            </Route>

            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route 
              path="/adminDashboard" 
              element={isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin />} 
            />
          </Routes>
        </div>
      </Router>
    </BalanceProvider>
  );
};

export default App;
