import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/features/landing/LandingPage";
import AuthContainer from "@/features/auth/AuthContainer"; // Import AuthContainer
import ProtectedRoute from "@/routes/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import { useHomeStore } from "@/store/home";
import HomeContainer from "../features/home/HomeContainer";
import WelcomeContainer from "@/features/welcome/WelcomeContainer";

function AppRoutes() {
  //!! Temporary Hard Coded Values Remove Later On
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
        <Route
          path="/forgot-password"
          element={<AuthContainer mode="forgot-password" />}
        />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/welcome" element={<WelcomeContainer />} />
        </Route>
        {currentHome && (
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<HomeContainer mode="dashboard" />}
            />
            {currentHome.rooms.map((room) => {
              const formattedName = room.name.replace(/\s+/g, ""); // Remove spaces
              return (
                <Route
                  key={room._id}
                  path={`/${formattedName}`}
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
