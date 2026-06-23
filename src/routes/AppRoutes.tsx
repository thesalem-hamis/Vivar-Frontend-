import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "@/pages/overview/HomePage";
import AboutPage from "@/pages/overview/AboutPage";
import AdminLayout from "@/layout/AdminLayout";
import AdminHome from "@/pages/admin/AdminHome";
import Properties from "@/pages/admin/property/Properties";
import { LoginPage } from "@/pages/admin/LoginPage";
import AddPropertyPage from "@/pages/admin/property/AddProperty";
import EditPropertyPage from "@/pages/admin/property/EditPropert";
import SearchPage from "@/pages/overview/SearchPage";
import PropertyDetailsPage from "@/pages/overview/PropertyDetails";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="/properties" element={<SearchPage />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        <Route path="admin/" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/add" element={<AddPropertyPage />} />
          <Route path="properties/edit/:id" element={<EditPropertyPage />} />
        </Route>
        <Route path="admin/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
