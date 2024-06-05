import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/Auth/AuthContext';
import { RoleProvider } from './components/Auth/RoleContext';
import { routes } from './routes';  // import routes


function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <div className="App">
          <Router>
            <Routes>
              {routes}
            </Routes>
          </Router>
        </div>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
