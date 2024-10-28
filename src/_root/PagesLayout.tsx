import { STBar, TBar } from "@/components/shared";
import { Outlet } from "react-router-dom";

const PagesLayout = () => {
  return (
    <div className="w-full">
      <TBar />
      <STBar />
      <div className="flex h-[calc(100vh-56px)]">
        <section className="flex flex-1 h-full">
          <Outlet />
        </section>
      </div>
    </div>
  );
};
export default PagesLayout;
