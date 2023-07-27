import "./App.css";
import SignUp from "./Components/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from './Components/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
