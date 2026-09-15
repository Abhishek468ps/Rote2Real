"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  Coins,
  Trophy,
  Gift,
  Wallet,
  ChevronRight,
} from "lucide-react";

interface WalletButtonProps {
  brainCoins?: number;
  xp?: number;
}

export default function WalletButton({
  brainCoins = 1250,
  xp = 8450,
}: WalletButtonProps) {
  const [open, setOpen] = useState(false);

  const level = useMemo(() => {
    return Math.floor(xp / 1000);
  }, [xp]);

  return (
    <div className="relative">

      {/* Wallet Button */}

      <button
        onClick={() => setOpen(!open)}
        className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/[0.05]
        px-4
        py-2.5
        backdrop-blur-2xl
        transition-all
        duration-300
        hover:border-cyan-500/40
        hover:bg-white/[0.08]
        "
      >
        <div
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-br
          from-yellow-400
          via-orange-400
          to-yellow-500
          text-black
          shadow-lg
          "
        >
          <Wallet size={18} />
        </div>

        <div className="hidden text-left xl:block">
          <p
            className="
            text-xs
            text-gray-400
            "
          >
            Brain Coins
          </p>

          <p
            className="
            font-bold
            text-white
            "
          >
            {brainCoins.toLocaleString()}
          </p>
        </div>
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
              border-b
              border-white/10
              bg-gradient-to-r
              from-indigo-600/20
              via-cyan-500/10
              to-purple-600/20
              p-6
              "
            >
              <h3
                className="
                text-lg
                font-bold
                text-white
                "
              >
                Brain Wallet
              </h3>

              <p
                className="
                mt-1
                text-sm
                text-gray-400
                "
              >
                Rewards, XP and Brain Coins
              </p>
            </div>

            {/* Stats */}

            <div className="space-y-4 p-6">

              <div
                className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-white/[0.04]
                p-4
                "
              >
                <div className="flex items-center gap-4">

                  <div
                    className="
                    rounded-xl
                    bg-yellow-500/20
                    p-3
                    "
                  >
                    <Coins
                      className="text-yellow-400"
                      size={22}
                    />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Brain Coins
                    </p>

                    <h4
                      className="
                      text-xl
                      font-bold
                      text-white
                      "
                    >
                      {brainCoins.toLocaleString()}
                    </h4>

                  </div>

                </div>

              </div>

              <div
                className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-white/[0.04]
                p-4
                "
              >
                <div className="flex items-center gap-4">

                  <div
                    className="
                    rounded-xl
                    bg-cyan-500/20
                    p-3
                    "
                  >
                    <Trophy
                      className="text-cyan-400"
                      size={22}
                    />
                  </div>

                  <div>

                    <p className="text-sm text-gray-400">
                      Experience
                    </p>

                    <h4
                      className="
                      text-xl
                      font-bold
                      text-white
                      "
                    >
                      {xp.toLocaleString()} XP
                    </h4>

                  </div>

                </div>

              </div>

              <div
                className="
                rounded-2xl
                border
                border-cyan-500/20
                bg-gradient-to-r
                from-cyan-500/10
                to-indigo-500/10
                p-5
                "
              >
                <p className="text-sm text-gray-400">
                  Current Level
                </p>

                <h2
                  className="
                  mt-2
                  text-4xl
                  font-black
                  text-white
                  "
                >
                  {level}
                </h2>

                <div
                  className="
                  mt-4
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-white/10
                  "
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${xp % 1000 / 10}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    to-indigo-500
                    "
                  />
                </div>
              </div>

            </div>

            {/* Footer */}

            <div
              className="
              border-t
              border-white/10
              p-5
              "
            >
              <button
                className="
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                to-cyan-600
                px-5
                py-4
                font-semibold
                text-white
                transition
                hover:opacity-90
                "
              >
                <span className="flex items-center gap-2">
                  <Gift size={18} />
                  Rewards Marketplace
                </span>

                <ChevronRight size={18} />
              </button>
            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}