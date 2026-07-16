import { Outlet } from "react-router-dom";
import ScrollToTopButton from "../components/layout/ScrollToTopButton";

export default function MainLayout() {
  return (
    <>
      <div className="bg-[#f0f00] min-h-screen">
        <main>
          <Outlet />
        </main>
        <ScrollToTopButton />
      </div>
    </>
  );
}