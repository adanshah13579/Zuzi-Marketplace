import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Components/AuthCompoents/Loginform';
import Register from '../Components/AuthCompoents/RegisterForm';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="forgot-password" element={<div>Forgot Password Page</div>} />
        <Route path="terms" element={<div>Terms of Service Page</div>} />
        <Route path="privacy" element={<div>Privacy Policy Page</div>} />
        <Route path="*" element={<Navigate to="login" replace />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;