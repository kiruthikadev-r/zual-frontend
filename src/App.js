import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetails';
import BlogForm from './components/BlogForm';
import BlogEdit from './components/BlogEdit';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <BlogList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/posts/:id" 
              element={
                <ProtectedRoute>
                  <BlogDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/new" 
              element={
                <ProtectedRoute >
                  <BlogForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/posts/edit/:id" 
              element={
                <ProtectedRoute >
                  <BlogEdit />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
