import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "@/pages/overview/HomePage";
import AboutPage from "@/pages/overview/AboutPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
