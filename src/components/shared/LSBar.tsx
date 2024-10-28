import { LefsideBarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { Link, NavLink } from "react-router-dom";

const LSBar = () => {
  const { user } = useUserContext();
  return (
    <div className="leftside-bar">
      <ul>
        <Link to={`/profile/${user.id}`} className="leftside-bar-link">
          <img
            src={user.imageUrl || "logo.svg"}
            alt="Profile"
            className="size-7 rounded-full"
          />
          <p>{user.name}</p>
        </Link>

        {LefsideBarLinks.map((link: INavLink) => {
          return (
            <li key={link.label}>
              <NavLink to={link.route} className="leftside-bar-link">
                <img src={link.imgURL} alt={link.label} className="size-7" />
                {link.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default LSBar;
