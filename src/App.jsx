import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./Components/Atoms";
import { Home, Login, Profile, AddQuiz, AddQuestion } from "./Pages";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectIsAuthenticated } from "./service/auth/authSlice";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    // Memeriksa apakah token JWT masih tersedia di sessionStorage
    const jwtToken = sessionStorage.getItem("jwt_token");
    if (jwtToken) {
      dispatch(login());
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="fixed z-10 top-0 left-0 w-full px-[10%] bg-gray-100/60">
        <Header />
      </div>

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/addquiz"
          element={isAuthenticated ? <AddQuiz /> : <Navigate to="/addquiz" />}
        />
        <Route
          path="/addquestion"
          element={
            isAuthenticated ? <AddQuestion /> : <Navigate to="/addquestion" />
          }
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
