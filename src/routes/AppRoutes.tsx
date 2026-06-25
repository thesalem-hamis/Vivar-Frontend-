import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import PropertiesListingPage from "@/pages/PropertiesPage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import UsersPage from "@/pages/admin/UsersPage";
import PropertiesPage from "@/pages/admin/PropertiesPage";
import LoginPage from "@/pages/admin/LoginPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="properties" element={<PropertiesListingPage />} />
        <Route path="properties/:id" element={<PropertyDetailPage />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="properties" element={<PropertiesPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}