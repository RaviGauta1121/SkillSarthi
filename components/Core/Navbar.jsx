"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { StaticNav } from "./Static-nav";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const FloatingNav = ({ className }) => {
  const [visible, setVisible] = useState(true);
  const { data: session, status } = useSession(); // useSession from next-auth

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex w-full z-[9999999999] fixed top-0 inset-x-0 border border-transparent dark:border-white/[0.2] rounded-b-3xl bg-white/05 backdrop-blur-sm shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] pr-2 pl-8 py-2 items-center justify-between",
            className
          )}
        >
          <StaticNav color={"red-600"} />

          {/* Example session usage */}
          {status === "authenticated" ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-800">
                Welcome, {session.user?.name}
              </span>
              <Link href="/api/auth/signout" className="text-blue-600 hover:underline">
                Sign Out
              </Link>
            </div>
          ) : (
            <Link href="/api/auth/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
