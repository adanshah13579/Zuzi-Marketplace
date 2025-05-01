import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import HomePage from '../Pages/HomePage/HomePage';
import Favorites from '../Pages/Favorites/Favorites';
import Profile from '../Pages/Profile/Profile';
import Chat from '../Pages/Chat/Chat';
import Subcategory from '../Pages/Subcategory/Subcategory';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />
      
      {/* Product Details Page */}
      <Route path="/product/:id" element={<ProductDetails />} />
      
      {/* Subcategory Page */}
      <Route path="/category/:categoryId/:subcategoryId" element={<Subcategory />} />
      
      {/* Favorites Page */}
      <Route path="/favorites" element={<Favorites />} />
      
      {/* Profile Page */}
      <Route path="/profile" element={<Profile />} />
      
      {/* Chat Page */}
      <Route path="/chat" element={<Chat />} />
      
      {/* Auth Routes */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 