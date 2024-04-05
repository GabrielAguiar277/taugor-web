
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import { PublicRoute } from './components/PublicRoute';

function App() {



  return (
    <>
      <Router>

        <Routes>
          <Route path='/' element={(
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          )}/>
          <Route path="/login" element={(
            <PublicRoute>
              <Login />
            </PublicRoute>
          )}/>
          <Route path="/register" element={(
            <PublicRoute>
              <Register />
            </PublicRoute>
          )}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
