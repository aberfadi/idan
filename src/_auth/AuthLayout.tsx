import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthed = false;
  return (
    <>
      {isAuthed ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-col items-center h-screen py-10 gap-6">
            <img src="logo.svg" alt="" className="size-16 " />
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};
export default AuthLayout;
