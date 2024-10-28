import { TopBarLinks } from "@/constants";

import { NavLink, useLocation } from "react-router-dom";

const STBar = () => {
  const { pathname } = useLocation();
  return (
    <section>
      <ul className="sub-topbar">
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
    </section>
  );
};
export default STBar;
