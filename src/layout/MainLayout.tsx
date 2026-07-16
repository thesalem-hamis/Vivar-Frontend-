import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTopButton from "../components/layout/ScrollToTopButton";

export default function MainLayout() {
  return (
    <>
      <div className="bg-[#f0f00] min-h-screen">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
}