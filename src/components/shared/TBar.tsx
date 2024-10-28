import { Button, Popover, PopoverContent, PopoverTrigger } from "../ui";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { TopBarLinks } from "@/constants";
import { useSignOutAccount } from "@/lib/query/queries";
import { useEffect } from "react";

const TBar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  const { user } = useUserContext();

  // Function to toggle visibility
  const { pathname } = useLocation();

  return (
    <div className="topbar">
      <div className="flex flex-1 items-center w-1/3 gap-2">
        <Link to="/" className="flex-none">
          <img src="logo.svg" alt="Logout" className="size-10 " />
          {/* <IoArrowBack className="size-5 fill:bg-white  rounded-full" /> */}
        </Link>
      </div>

      <div className="gap-5 flex-1 hidden md:flex-center">
        <ul className="flex gap-3">
          {TopBarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`rounded px-4 py-1 ${isActive && "bg-primary-1"}`}
              >
                <NavLink to={link.route}>
                  <img src={link.imgURL} alt={link.label} className="size-9" />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex-end flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="px-0">
              <img
                src={user.imageUrl || "logo.svg"}
                alt="Profile"
                className="size-9 rounded-full hover:brightness-200"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="popover">
            <Button onClick={() => signOut()} className="button-3">
              Log Out
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
export default TBar;
