import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div className="bg-[#f0f00] min-h-screen">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
