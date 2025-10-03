import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="w-[100vw]">
      <Navbar />

      <Outlet />
    </div>
  );
};

export default MainLayout;
