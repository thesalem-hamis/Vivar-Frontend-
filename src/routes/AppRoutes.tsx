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
import ContactUsPage from "@/pages/ContactUsPage";
import BlogsPage from "@/pages/BlogsPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import EnquiryPage from "@/pages/EnquiryPage";
import AdminBlogsPage from "@/pages/admin/BlogsPage";
import EnquiriesPage from "@/pages/admin/EnquiriesPage";
import PropertyEnquiriesPage from "@/pages/admin/PropertyEnquiriesPage";
import LeadsPage from "@/pages/admin/LeadsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactUsPage />} />
        <Route path="enquiry" element={<EnquiryPage />} />
        <Route path="blog" element={<BlogsPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />
        <Route path="properties" element={<PropertiesListingPage />} />
        <Route path="properties/:id" element={<PropertyDetailPage />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="properties" element={<PropertiesPage />} />
        <Route path="blogs" element={<AdminBlogsPage />} />
        <Route path="enquiries" element={<EnquiriesPage />} />
        <Route path="property-enquiries" element={<PropertyEnquiriesPage />} />
        <Route path="leads" element={<LeadsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
