import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "@/pages/overview/HomePage";
import AboutPage from "@/pages/overview/AboutPage";
import AdminLayout from "@/layout/AdminLayout";
import AdminHome from "@/pages/admin/AdminHome";
import Properties from "@/pages/admin/Properties";
import { LoginPage } from "@/pages/admin/LoginPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="admin/" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="properties" element={<Properties />} />
        </Route>
        <Route path="admin/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
