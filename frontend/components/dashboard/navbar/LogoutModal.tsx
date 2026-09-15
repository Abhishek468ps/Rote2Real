"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, LogOut, X } from "lucide-react";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  open,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blur Background */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
            fixed
            inset-0
            z-[100]
            bg-black/60
            backdrop-blur-md
            "
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            transition={{
              duration: 0.22,
            }}
            className="
            fixed
            left-1/2
            top-1/2
            z-[101]
            w-[92%]
            max-w-md
            -translate-x-1/2
            -translate-y-1/2
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            dark:border-white/10
            bg-white
            dark:bg-[#0E1729]
            shadow-2xl
            "
          >
            {/* Header */}

            <div
              className="
              flex
              items-center
              justify-between
              border-b
              border-slate-200
              dark:border-white/10
              p-6
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                  rounded-full
                  bg-red-500/20
                  p-3
                  "
                >
                  <AlertTriangle
                    className="text-red-500"
                    size={24}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Logout
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Are you sure?
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="
                rounded-xl
                p-2
                hover:bg-slate-100
                dark:hover:bg-white/10
                transition
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}

            <div className="p-6">
              <p className="leading-7 text-slate-600 dark:text-slate-300">
                You are about to logout from your Brain Train account.
              </p>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Your current session will end and you'll need to sign in again.
              </p>
            </div>

            {/* Footer */}

            <div
              className="
              flex
              justify-end
              gap-3
              border-t
              border-slate-200
              dark:border-white/10
              p-6
              "
            >
              <button
                onClick={onClose}
                className="
                rounded-xl
                border
                border-slate-300
                dark:border-white/10
                px-5
                py-2.5
                hover:bg-slate-100
                dark:hover:bg-white/10
                transition
                "
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-2.5
                font-semibold
                text-white
                hover:bg-red-700
                transition
                "
              >
                <LogOut size={18} />

                Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}