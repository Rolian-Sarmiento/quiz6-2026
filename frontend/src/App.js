import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // 1. Import the Provider

import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ApplySeller from './screens/ApplySeller';
import UserScreen from './screens/UserScreen';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import Header from './components/Header';
import Chatbot from './components/Chatbox.jsx';

function App() {

  const initialOptions = {
    "client-id": "AQEseMijEHuf2DIV4-uNU2wzznuRr1mD8GN149PtWGx1ekoCjKtP894HBE_Cc8O9e7YOlelQGusQE2uo",
    currency: "PHP",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}> {/* 3. Wrap the App */}
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/service/:id" element={<DetailScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/apply" element={<ApplySeller />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<UserScreen />} />
            </Routes>
          </Container>
        </main>
        <Chatbot />
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;