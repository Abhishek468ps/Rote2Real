"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  ChevronDown,
  User,
  Settings,
  Trophy,
  Wallet,
  History,
  Moon,
  Sun,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/api";
import { useTheme } from "@/context/ThemeProvider";
import LogoutModal from "./LogoutModal";

interface UserProfile {

  id: number;

  fullName: string;

  email: string;

  role: string;

  braintrainId: string;
 online: boolean;
 wallet: number;
  brainCoins: number;

  xp: number;

  profileImage: string | null;

}

export default function ProfileMenu() {

     const {
        theme,
        toggleTheme,
    } = useTheme();
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  // Temporary data
  // Later JWT/API se replace karenge

  

const [loading, setLoading] =
  useState(true);

const [user, setUser] =
  useState<UserProfile | null>(
    null
  );

  



 const initials =
  user?.fullName
    ?.split(" ")
    .map(
      (word) => word[0]
    )
    .join("")
    .toUpperCase() ?? "";

    useEffect(() => {

  async function loadProfile() {

    try {

      const token =
        localStorage.getItem(
          "token"
        );


if (!token) {
  setLoading(false);
  return;
}

const storedRole = localStorage.getItem("role");

const role = storedRole
  ?.replace(/^"|"$/g, "")
  .trim()
  .toUpperCase();

    // Decide profile API according to role
let profileEndpoint: string;

switch (role) {

  case "ADMIN":
    profileEndpoint = API_ENDPOINTS.ADMIN_ME;
    break;

     case "MENTOR":
    profileEndpoint = API_ENDPOINTS.MENTOR_ME;
    break;

  case "STUDENT":
    profileEndpoint = API_ENDPOINTS.STUDENT_ME;
    break;

  default:
    console.error("Unknown user role:", role);
    setLoading(false);
    return;
}

console.log("================================");
console.log("Stored Role:", storedRole);
console.log("Normalized Role:", role);
console.log("Profile Endpoint:", profileEndpoint);
console.log("================================");

// Call correct profile API
const response =
  await fetch(
    profileEndpoint,
    {
      method: "GET",

      headers: {
        Authorization:
          `Bearer ${token}`,

        "Content-Type":
          "application/json",
      },
    }
  );

     if (!response.ok) {

    const errorText = await response.text();

 console.error(
          "Profile Status:",
          response.status
        );

        console.error(
          "Profile Response:",
          errorText
        );

    throw new Error(
        `Unable to load profile. Status: ${response.status}`
    );

}

      const data =
        await response.json();
   console.log("PROFILE DATA:", data);
      setUser(data);

    } catch (error) {

       console.error(
        "Profile loading error:",
        error
      );

    } finally {

      setLoading(false);

    }

  }

  loadProfile();

}, []);

if (loading) {

  return (

    <div
      className="
      h-11
      w-44
      animate-pulse
      rounded-2xl
      bg-white/10
      "
    />

  );

}

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* ======================
          Profile Button
      ======================= */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-3
        py-2
        transition
        hover:bg-white/10
        "
      >
        {/* Avatar */}

        <div className="relative">
          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-cyan-500
            via-indigo-500
            to-purple-600
            text-sm
            font-bold
            text-white
            shadow-lg
            "
          >
            {initials}
          </div>

          {user?.online && (
            <span
              className="
              absolute
              bottom-0
              right-0
              h-3
              w-3
              rounded-full
              border-2
              border-[#09101f]
              bg-emerald-400
              "
            />
          )}
        </div>

        {/* User Info */}

        <div
          className="
          hidden
          text-left
          lg:block
          "
        >
          <p
            className="
            text-sm
            font-semibold
            text-white
            "
          >
            {user?.fullName}
          </p>

          <p
            className="
            text-xs
            text-slate-400
            "
          >
            {user?.role}
          </p>
        </div>

        <motion.div
          animate={{
            rotate: open
              ? 180
              : 0,
          }}
        >
          <ChevronDown
            size={18}
          />
        </motion.div>
      </button>

      {/* ======================
            Dropdown
      ======================= */}

      <AnimatePresence>

        {open && (

          <motion.div
          key="profile-dropdown"
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.96,
            }}
            transition={{
              duration: 0.18,
            }}
            className="
            absolute
            right-0
            mt-3
            w-80
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
dark:border-white/10
            bg-white/95
dark:bg-[#0E1729]/95
            shadow-2xl
            backdrop-blur-3xl
            "
          >
            {/* Header */}

            <div
              className="
              border-b
              border-white/10
              p-6
              "
            >
              <div
                className="
                flex
                items-center
                gap-4
                "
              >
                <div className="relative">

                  <div
                    className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-cyan-500
                    via-indigo-500
                    to-purple-600
                    text-xl
                    font-bold
                    text-white
                    "
                  >
                   {
  user?.profileImage ? (
    <img
      src={user.profileImage}
      alt="profile"
      className="
      h-full
      w-full
      rounded-full
      object-cover
      "
    />
  ) : (
    initials
  )
}
                  </div>

                  {user?.online && (
                    <span
                      className="
                      absolute
                      bottom-1
                      right-1
                      h-4
                      w-4
                      rounded-full
                      border-2
                      border-[#09101f]
                      bg-emerald-400
                      "
                    />
                  )}

                </div>

                <div>

                  <h3
                    className="
                    text-lg
                    font-bold
                    text-white
                    "
                  >
                    {user?.fullName}
                  </h3>

                  <p
                    className="
                    mt-1
                    text-sm
                    text-cyan-300
                    "
                  >
                    {user?.role}
                  </p>

                  <p
                    className="
                    mt-1
                    text-xs
                    text-slate-400
                    "
                  >
                    {user?.braintrainId}
                  </p>

                </div>

              </div>
            </div>

            {/* Placeholder */}

           <div className="p-3 space-y-2">

  <Link
    href="/dashboard/profile"
    className="
    flex
    items-center
    gap-3
    rounded-xl
    p-3
    hover:bg-white/10
    transition
    "
  >
    <User size={18} />
    <span>My Profile</span>
  </Link>

  <Link
    href="/dashboard/settings"
    className="
    flex
    items-center
    gap-3
    rounded-xl
    p-3
    hover:bg-white/10
    transition
    "
  >
    <Settings size={18} />
    <span>Account Settings</span>
  </Link>

  <Link
    href="/dashboard/achievements"
    className="
    flex
    items-center
    gap-3
    rounded-xl
    p-3
    hover:bg-white/10
    transition
    "
  >
    <Trophy size={18} />
    <span>Achievements</span>
  </Link>

  <Link
    href="/dashboard/wallet"
    className="
    flex
    items-center
    gap-3
    rounded-xl
    p-3
    hover:bg-white/10
    transition
    "
  >
    <Wallet size={18} />

    <span>Wallet</span>

    <span
      className="
      ml-auto
      rounded-full
      bg-cyan-500/20
      px-2
      py-1
      text-xs
      "
    >
      {user?.wallet}
    </span>
  </Link>

  <Link
    href="/dashboard/mvps"
    className="
    flex
    items-center
    gap-3
    rounded-xl
    p-3
    hover:bg-white/10
    transition
    "
  >
    <History size={18} />
    <span>MVP History</span>
  </Link>

</div>


<div className="my-2 border-t border-white/10" />

<button
  onClick={toggleTheme}
  className="
    flex
    w-full
    items-center
    justify-between
    rounded-xl
    px-4
    py-3
    transition
    hover:bg-white/10
  "
>

  <div
    className="
      flex
      items-center
      gap-3
    "
  >

    {theme === "dark"

      ? <Sun size={18} />

      : <Moon size={18} />

    }

    <span>

      {theme === "dark"

        ? "Light Mode"

        : "Dark Mode"}

    </span>

  </div>

</button>

<div className="my-2 border-t border-white/10" />

<div
    className="
    border-t
    border-white/10
    p-3
    "
>

    <button
  onClick={() => setLogoutOpen(true)}
  className="
  flex
  w-full
  items-center
  gap-3
  rounded-xl
  p-3
  text-red-500
  hover:bg-red-500/10
  transition
  "
>
  <LogOut size={18} />

  <span>Logout</span>
</button>
</div>

          </motion.div>

        )}

        <LogoutModal
        key="logout-modal"
    open={logoutOpen}
    onClose={() => setLogoutOpen(false)}
    onConfirm={() => {

        const theme =
            localStorage.getItem("theme");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");

        if (theme) {
            localStorage.setItem(
                "theme",
                theme
            );
        }

        window.location.href = "/login";
    }}
/>

      </AnimatePresence>

    </div>
  );
}
