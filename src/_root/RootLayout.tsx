import { LSBar, RSBar, STBar, TBar } from "@/components/shared";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full">
      <TBar /> {/* Top bar */}
      <STBar />
      <div className="flex h-[calc(100vh-56px)]">
        <LSBar /> {/* Left Side bar */}
        <section className="flex flex-1 h-full">
          <Outlet />
        </section>
        <RSBar /> {/* Right Side bar */}
      </div>
    </div>
  );
};
export default RootLayout;
