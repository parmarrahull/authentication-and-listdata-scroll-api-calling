import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import UsersList from './components/UsersList';
import PrivateRoute from './routes/PrivateRoute';

const App = () => (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<PrivateRoute><UsersList /></PrivateRoute>} />
            </Routes>
        </AuthProvider>
    </Router>
);

export default App;
