import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, RequireNoAuth } from './context/AuthContext';
import Providers from './providers/Providers';
import NavBar from './components/NavBar';
import GameList from './components/GameList';
import GameDetails from './components/GameDetails';
import SignInPage from './components/auth/SignInPage';
import SignUpPage from './components/auth/SignUpPage';
import Library from './components/Library';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Providers>
      <Router>
        <div className="app">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<GameList />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route
                path="/sign-in"
                element={
                  <RequireNoAuth>
                    <SignInPage />
                  </RequireNoAuth>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <RequireNoAuth>
                    <SignUpPage />
                  </RequireNoAuth>
                }
              />
              <Route
                path="/library"
                element={
                  <RequireAuth>
                    <Library />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Providers>
  );
}

export default App; 