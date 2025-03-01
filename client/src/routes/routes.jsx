import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/features/landing/LandingPage";
import AuthContainer from "@/features/auth/AuthContainer"; // Import AuthContainer
import ProtectedRoute from "@/routes/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import { useHomeStore } from "@/store/home";
import HomeContainer from "../features/home/HomeContainer";

function AppRoutes() {
  const { currentHome, fetchHomeByUserId, setCurrentHome } = useHomeStore();

  useEffect(() => {
    async function fetchData() {
      await fetchHomeByUserId("67ad62846b0327d660ea0494");
      await setCurrentHome("67b318f5d25d38aa0439d87a");
    }

    fetchData();
  }, [fetchHomeByUserId, setCurrentHome]);

  return (
    <Router>
      <Routes>
        {/* Root Route */}
        <Route path="/" element={<LandingPage />} />
        {/* Public Routes */}
        <Route path="/login" element={<AuthContainer mode="login" />} />
        <Route path="/register" element={<AuthContainer mode="register" />} />
        {/* prettier-ignore */}
        <Route path="/forgot-password" element={<AuthContainer mode="forgot-password" />} />
        {/* Protected Routes */}
        {currentHome && (
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<HomeContainer mode="dashboard" />}
            />
            {currentHome.rooms.map((room) => {
              return (
                <Route
                  key={room._id}
                  path={`/${room.name}`}
                  element={<HomeContainer mode="room" />}
                />
              );
            })}
          </Route>
        )}
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
