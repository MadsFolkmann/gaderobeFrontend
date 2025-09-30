import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <NavBar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}