import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PublicLayout from "../layouts/PublicLayout";
import JobDetails from "../pages/public/careers/JobDetails";
import ApplyJob from "../pages/public/apply/ApplyJob";
import ApplicationSuccess from "../pages/public/apply/ApplicationSuccess";

import Login from "../pages/Login/Login";
import Signup from "../pages/public/auth/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import Jobs from "../pages/Jobs/Jobs";
import Campaigns from "../pages/Campaigns/Campaigns";
import Applicants from "../pages/Applicants/Applicants";
import Users from "../pages/Users/Users";
import Profile from "../pages/Profile/Profile";
import CareerHome from "../pages/public/careers/CareerHome";
import ProtectedRoute from "../components/layout/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/careers" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/careers" element={<PublicLayout><CareerHome /></PublicLayout>} />
      <Route path="/careers/job/:id" element={<PublicLayout><JobDetails /></PublicLayout>} />
      <Route path="/careers/job/:id/apply" element={<ApplyJob />} />
      <Route path="/application-success" element={<ApplicationSuccess />} />


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