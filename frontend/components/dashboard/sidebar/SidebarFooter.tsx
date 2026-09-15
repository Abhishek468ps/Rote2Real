/*"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LogOut,
  Settings,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { API_ENDPOINTS } from "@/lib/api";



interface SidebarFooterProps {
  collapsed: boolean;
  user?: {
    name: string;
    role: string;
    brainTrainId: string;
    xp?: number;
    avatar?: string;
  };
  onLogout?: () => void;
}

export default function SidebarFooter({
  collapsed,
  user,
  onLogout,
}: SidebarFooterProps) {
  const name = user?.name || "User";
  const role = user?.role || "User";
  const brainTrainId = user?.brainTrainId || "Not assigned";
  const xp = user?.xp ?? 0;
  const avatar = user?.avatar || "";

  const formattedRole = role
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

  const initial = name
    ? name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="border-t border-white/10 p-4">

     

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        p-3
        backdrop-blur-xl
        "
      >

        <div className="flex items-center gap-3">

       

          <div className="relative">

            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-indigo-500
              via-cyan-500
              to-purple-600
              p-[2px]
              "
            >
              <div
                className="
                flex
                h-full
                w-full
                items-center
                justify-center
                rounded-full
                bg-slate-900
                overflow-hidden
                "
              >
              {avatar ? (
                  <Image
                    src={avatar}
                    alt={name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {initial}
                  </span>
                )}
              </div>
            </div>

          

            <span
              className="
              absolute
              bottom-0
              right-0
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-slate-900
              bg-emerald-500
              "
            />

          </div>

          {!collapsed && (

            <div className="flex-1 overflow-hidden">

              <h4 className="truncate font-semibold text-white">
                {name}
              </h4>

              <p className="text-xs text-slate-400">
                {formattedRole}
              </p>

              <p className="mt-1 text-[11px] text-indigo-400">
                {brainTrainId}
              </p>

            </div>

          )}

        </div>

        {!collapsed && (

          <>
           

            <div className="mt-4">

              <div className="mb-1 flex justify-between text-xs">

                <span className="text-slate-400">
                  XP Progress
                </span>

                <span className="text-cyan-400">
                  {xp} XP
                </span>

              </div>

              <div className="h-2 rounded-full bg-slate-800">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1 }}
                  className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-indigo-500
                  via-cyan-500
                  to-purple-500
                  "
                />

              </div>

            </div>

           

            <div className="mt-5 space-y-2">

              <Link
                href="/dashboard/settings"
                className="
                flex
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                text-sm
                text-slate-300
                transition
                hover:bg-white/10
                "
              >
                <div className="flex items-center gap-2">
                  <Settings size={17} />
                  Settings
                </div>

                <ChevronRight size={15} />
              </Link>

              <Link
                href="/dashboard/security"
                className="
                flex
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                text-sm
                text-slate-300
                transition
                hover:bg-white/10
                "
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck size={17} />
                  Security
                </div>

                <ChevronRight size={15} />
              </Link>

              <button
                onClick={onLogout}
                className="
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                text-sm
                text-red-400
                transition
                hover:bg-red-500/10
                "
              >
                <div className="flex items-center gap-2">
                  <LogOut size={17} />
                  Logout
                </div>

                <ChevronRight size={15} />
              </button>

            </div>
          </>

        )}

      </motion.div>

    </div>
  );
}*/



"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  Settings,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { API_ENDPOINTS } from "@/lib/api";

interface SidebarUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  brainTrainId: string;
  online: boolean;
  wallet: number;
  brainCoins: number;
  xp: number;
  profileImage: string | null;
}

interface SidebarFooterProps {
  collapsed: boolean;
  onLogout?: () => void;
}

export default function SidebarFooter({
  collapsed,
  onLogout,
}: SidebarFooterProps) {
  const [user, setUser] = useState<SidebarUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const storedRole = localStorage.getItem("role");

        const role = storedRole
          ?.replace(/^"|"$/g, "")
          .trim()
          .toUpperCase();

        let profileEndpoint: string;

        switch (role) {
          case "ADMIN":
            profileEndpoint = API_ENDPOINTS.ADMIN_ME;
            break;

          case "STUDENT":
            profileEndpoint = API_ENDPOINTS.STUDENT_ME;
            break;

          default:
            console.error("Unknown user role:", role);
            setLoading(false);
            return;
        }

        const response = await fetch(profileEndpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();

          console.error(
            "Sidebar profile status:",
            response.status
          );

          console.error(
            "Sidebar profile response:",
            errorText
          );

          throw new Error(
            `Unable to load profile. Status: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("SIDEBAR PROFILE DATA:", data);

        setUser(data);
      } catch (error) {
        console.error(
          "Sidebar profile loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  /*
   * Default values while profile is loading
   */
  const name = user?.fullName || "User";
  const role = user?.role || "User";
  const brainTrainId =
    user?.brainTrainId || "Not assigned";

  const xp = user?.xp ?? 0;

  const avatar = user?.profileImage || "";

  /*
   * Format role
   * Example:
   * SOFTWARE_DEVELOPER
   * → Software Developer
   */
  const formattedRole = role
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  /*
   * Initial
   */
  const initial = name
    ? name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="border-t border-white/10 p-4">

      {/* Profile Card */}

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.05]
          p-3
          backdrop-blur-xl
        "
      >

        <div className="flex items-center gap-3">

          {/* Avatar */}

          <div className="relative">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-indigo-500
                via-cyan-500
                to-purple-600
                p-[2px]
              "
            >

              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-slate-900
                "
              >

                {avatar ? (
                  <Image
                    src={avatar}
                    alt={name}
                    width={48}
                    height={48}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {initial}
                  </span>
                )}

              </div>

            </div>

            {/* Online Status */}

            {user?.online && (
              <span
                className="
                  absolute
                  bottom-0
                  right-0
                  h-3.5
                  w-3.5
                  rounded-full
                  border-2
                  border-slate-900
                  bg-emerald-500
                "
              />
            )}

          </div>


          {/* User Information */}

          {!collapsed && (

            <div className="flex-1 overflow-hidden">

              <h4 className="truncate font-semibold text-white">
                {loading ? "Loading..." : name}
              </h4>

              <p className="text-xs text-slate-400">
                {formattedRole}
              </p>

              <p className="mt-1 text-[11px] text-indigo-400">
                {brainTrainId}
              </p>

            </div>

          )}

        </div>


        {/* Expanded Content */}

        {!collapsed && (

          <>

            {/* XP */}

            <div className="mt-4">

              <div className="mb-1 flex justify-between text-xs">

                <span className="text-slate-400">
                  XP Progress
                </span>

                <span className="text-cyan-400">
                  {xp} XP
                </span>

              </div>


              <div className="h-2 rounded-full bg-slate-800">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1 }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-indigo-500
                    via-cyan-500
                    to-purple-500
                  "
                />

              </div>

            </div>


            {/* Quick Actions */}

            <div className="mt-5 space-y-2">

              <Link
                href="/dashboard/settings"
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  text-slate-300
                  transition
                  hover:bg-white/10
                "
              >

                <div className="flex items-center gap-2">

                  <Settings size={17} />

                  Settings

                </div>

                <ChevronRight size={15} />

              </Link>


              <Link
                href="/dashboard/security"
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  text-slate-300
                  transition
                  hover:bg-white/10
                "
              >

                <div className="flex items-center gap-2">

                  <ShieldCheck size={17} />

                  Security

                </div>

                <ChevronRight size={15} />

              </Link>


              <button
                onClick={onLogout}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  text-red-400
                  transition
                  hover:bg-red-500/10
                "
              >

                <div className="flex items-center gap-2">

                  <LogOut size={17} />

                  Logout

                </div>

                <ChevronRight size={15} />

              </button>

            </div>

          </>

        )}

      </motion.div>

    </div>
  );
}