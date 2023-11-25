import { useContext } from "react";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profilepage } from "./pages/Profilepage";
import './style.scss';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to='/login' />
    }

    return children;
  }

  return (
      <>
      <Router>
        <ThemeProvider>
          <Routes path='/'>
            <Route index element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
            } />
            <Route path='profile' element={
            <ProtectedRoute>
              <Profilepage />
            </ProtectedRoute>
            } />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Routes>
        </ThemeProvider>
      </Router>
      </>
  )
}

export default App;
