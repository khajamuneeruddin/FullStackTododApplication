import { useState } from "react";
import { MyProvider } from "./Components/ContextApi";
import LoginPage from "./Components/LoginPage/LoginPage";
import Home from "./Components/HomePage/Home";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
