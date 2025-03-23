import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/features/landing/LandingPage";
import AuthContainer from "@/features/auth/AuthContainer"; // Import AuthContainer
import PublicRoute from "@/routes/PublicRoute";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Profile from "@/features/profile/Profile";
import Settings from "@/features/settings/Settings";
import NotFound from "@/pages/NotFound";
import { useHomeStore } from "@/store/home";
import HomeContainer from "../features/home/HomeContainer";
import WelcomeContainer from "@/features/welcome/WelcomeContainer";
import { userAuthStore } from "@/store/userAuth";

function AppRoutes() {
  const { isAuthenticated, user } = userAuthStore();
  const { currentHome, fetchHomeByUserId, setCurrentHome } = useHomeStore();
  // Update currentHome when isAuthenticated changes
  useEffect(() => {
    if (isAuthenticated && user) {
      // Fetch the home data for the authenticated user
      fetchHomeByUserId(user.username)
        .then((data) => {
          if (data?.success) {
            // Check if data exists and has a success property
            // Set the current home if the user has a home
            const { ownedHomes, dwelledHomes } = data.data;
            if (ownedHomes.length > 0) setCurrentHome(ownedHomes[0]._id);
            // Assuming the user has only one home
            else if (dwelledHomes.length > 0)
              setCurrentHome(dwelledHomes[0]._id);
            else setCurrentHome(null);
          } else {
            console.error(
              "Failed to fetch home data:",
              data?.message || "Unknown error"
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching home data:", error);
        });
    } else {
      // Reset currentHome if the user is not authenticated
      setCurrentHome(null);
    }
  }, [isAuthenticated, user, fetchHomeByUserId, setCurrentHome]);

  return (
    <Router>
      <Routes>
        {/* Root Route */}
        <Route path="/" element={<LandingPage />} />
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<AuthContainer mode="login" />} />
          <Route path="/register" element={<AuthContainer mode="register" />} />
          <Route
            path="/forgot-password"
            element={<AuthContainer mode="forgot-password" />}
          />
        </Route>
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
            <Route path="/energy" element={<HomeContainer mode="energy" />} />
            <Route path="/profile" element={<HomeContainer mode="profile" />} />
            <Route
              path="/permissions"
              element={<HomeContainer mode="permissions" />}
            />
            <Route
              path="/settings"
              element={<HomeContainer mode="settings" />}
            />
            {currentHome.rooms.map((room) => {
              const formattedName = room.name.replace(/\s+/g, "");
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
