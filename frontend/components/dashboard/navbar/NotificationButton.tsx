"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  Bell,
  CheckCircle2,
  Users,
  Trophy,
  Clock,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "48 Hours MVP Started",
    description:
      "Your AI MVP challenge has started.",
    time: "2 min ago",
    icon: Clock,
    unread: true,
  },
  {
    id: 2,
    title: "Team Invitation",
    description:
      "Rahul invited you to Team Alpha.",
    time: "15 min ago",
    icon: Users,
    unread: true,
  },
  {
    id: 3,
    title: "Achievement Unlocked",
    description:
      "Congratulations! XP +250 earned.",
    time: "1 hour ago",
    icon: Trophy,
    unread: false,
  },
  {
    id: 4,
    title: "Submission Verified",
    description:
      "Your latest MVP submission was verified.",
    time: "Yesterday",
    icon: CheckCircle2,
    unread: false,
  },
];

export default function NotificationButton() {
  const [open, setOpen] = useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(
      event: MouseEvent
    ) {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  const unreadCount =
    notifications.filter(
      (n) => n.unread
    ).length;

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      {/* Bell */}

      <button
        onClick={() => setOpen(!open)}
        className="
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-500/40
        hover:bg-white/[0.08]
        "
      >
        <Bell
          size={20}
          className="text-white"
        />

        {unreadCount > 0 && (
          <motion.span
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            className="
            absolute
            -right-1
            -top-1
            flex
            h-5
            min-w-[20px]
            items-center
            justify-center
            rounded-full
            bg-red-500
            px-1
            text-[10px]
            font-bold
            text-white
            "
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      {/* Dropdown */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 15,
              scale: 0.97,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
            absolute
            right-0
            mt-4
            w-[360px]
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#0d1528]/95
            backdrop-blur-3xl
            shadow-[0_25px_60px_rgba(0,0,0,.45)]
            "
          >
            {/* Header */}

            <div
              className="
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-6
              py-5
              "
            >
              <div>
                <h3
                  className="
                  text-lg
                  font-bold
                  text-white
                  "
                >
                  Notifications
                </h3>

                <p
                  className="
                  text-xs
                  text-gray-400
                  "
                >
                  Latest Brain Train updates
                </p>
              </div>

              <span
                className="
                rounded-full
                bg-cyan-500/20
                px-3
                py-1
                text-xs
                font-semibold
                text-cyan-300
                "
              >
                {unreadCount} New
              </span>
            </div>

            {/* Notification List */}

            <div
              className="
              max-h-[420px]
              overflow-y-auto
              "
            >
              {notifications.map((item) => {
                const Icon =
                  item.icon;

                return (
                  <motion.button
                    whileHover={{
                      x: 4,
                    }}
                    key={item.id}
                    className="
                    flex
                    w-full
                    items-start
                    gap-4
                    border-b
                    border-white/5
                    px-5
                    py-4
                    text-left
                    transition
                    hover:bg-white/[0.04]
                    "
                  >
                    <div
                      className="
                      rounded-2xl
                      bg-cyan-500/10
                      p-3
                      "
                    >
                      <Icon
                        size={18}
                        className="text-cyan-300"
                      />
                    </div>

                    <div className="flex-1">
                      <div
                        className="
                        flex
                        items-center
                        justify-between
                        "
                      >
                        <h4
                          className="
                          text-sm
                          font-semibold
                          text-white
                          "
                        >
                          {item.title}
                        </h4>

                        {item.unread && (
                          <span
                            className="
                            h-2
                            w-2
                            rounded-full
                            bg-cyan-400
                            "
                          />
                        )}
                      </div>

                      <p
                        className="
                        mt-1
                        text-xs
                        leading-5
                        text-gray-400
                        "
                      >
                        {item.description}
                      </p>

                      <p
                        className="
                        mt-2
                        text-[11px]
                        text-gray-500
                        "
                      >
                        {item.time}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer */}

            <div
              className="
              border-t
              border-white/10
              p-4
              "
            >
              <button
                className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-cyan-600
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:opacity-90
                "
              >
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}