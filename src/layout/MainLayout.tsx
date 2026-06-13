import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
    <div className="bg-[#f0f00] min-h-screen p-2 md:p-1">
      <main>
        <Outlet />
      </main>
    </div>
    </>
  );
}