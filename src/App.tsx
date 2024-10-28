import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import Register from "./_auth/forms/Register";
import Login from "./_auth/forms/Login";
import RootLayout from "./_root/RootLayout";

import { useEffect } from "react";
import RecoverPass from "./_auth/forms/RecoverPass";
import { Toaster } from "@/components/ui/toaster";
import {
  Chats,
  CreatePost,
  EditPost,
  Friends,
  Groups,
  Home,
  Pages,
  Profile,
  ProfileSettings,
} from "./_root/pages";
import PagesLayout from "./_root/PagesLayout";

const App = () => {
  // Theme Management
  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode =
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Initial theme setup
    updateTheme();

    // Set up a listener for changes to the prefers-color-scheme media query
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event: { matches: any }) => {
      if (event.matches) {
        localStorage.theme = "dark";
      } else {
        localStorage.theme = "light";
      }
      updateTheme(); // Update the theme when the system preference changes
    };

    mediaQuery.addEventListener("change", listener);

    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/create-account" element={<Register />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/recover-password" element={<RecoverPass />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create_post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
        </Route>

        <Route element={<PagesLayout />}>
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/groups" element={<Groups />} />

          <Route path="/settings" element={<ProfileSettings />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
