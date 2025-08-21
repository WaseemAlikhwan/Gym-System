import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Coaches from './pages/Coaches'
import Login from './pages/Login'
import Unauthorized from './pages/Unauthorized'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin only routes */}
          <Route path="/" element={
            <AdminRoute>
              <Navigate to="/dashboard" replace />
            </AdminRoute>
          } />
          
          <Route path="/dashboard" element={
            <AdminRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </AdminRoute>
          } />
          
          <Route path="/members" element={
            <AdminRoute>
              <Layout>
                <Members />
              </Layout>
            </AdminRoute>
          } />
          
          <Route path="/coaches" element={
            <AdminRoute>
              <Layout>
                <Coaches />
              </Layout>
            </AdminRoute>
          } />
          
          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
