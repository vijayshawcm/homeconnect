import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/features/landing/LandingPage";
import AuthContainer from "@/features/auth/AuthContainer"; // Import AuthContainer
import ProtectedRoute from "@/routes/ProtectedRoute";
import Dashboard from "@/features/dashboard/Dashboard";
import NotFound from "@/pages/NotFound";
import { useHomeStore } from "@/store/home";
import { useRoomStore } from "@/store/room";
import RoomPage from "../features/rooms/RoomPage";
import HomeContainer from "@/features/home/HomeContainer";

function AppRoutes() {
  const { currentHome, fetchHomeByUserId, setCurrentHome } = useHomeStore();
  const { rooms, fetchRoomsByHome } = useRoomStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await fetchHomeByUserId("67ad62846b0327d660ea0494");
      await setCurrentHome("67b318f5d25d38aa0439d87a");
      setLoading(false); // Mark data as readyF
    }

    fetchData();
  }, [fetchHomeByUserId, setCurrentHome]);

  // Fetch rooms dynamically when home changes
  useEffect(() => {
    if (currentHome) {
      fetchRoomsByHome(currentHome._id);
    }
  }, [currentHome, fetchRoomsByHome]);

  if (loading) {
    return <div>Loading...</div>; // Or a skeleton UI
  }

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
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<HomeContainer mode="dashboard" />} />
          {currentHome &&
            rooms.map((room) => {
              return (
                <Route
                  key={room._id}
                  path={`/${room.name}`}
                  element={<HomeContainer mode="room" />}
                />
              );
            })}
        </Route>
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
