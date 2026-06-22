import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Jobs from "../pages/Jobs/Jobs";
import Campaigns from "../pages/Campaigns/Campaigns";
import Applicants from "../pages/Applicants/Applicants";
import Users from "../pages/Users/Users";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute> <MainLayout /> </ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}