"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const IssueButton = () => {
  return (
    <motion.div
      className="fixed bottom-2 right-2 z-50"
      initial={{ width: "2.5rem" }}
      whileHover={{ width: "auto" }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href="/issue"
        className="group flex items-center justify-start bg-sky-200 rounded-full overflow-hidden p-2"
        style={{ height: "2.5rem" }}
      >
        <span className="text-lg">🤔</span>
        <motion.p
          className="text-xs font-semibold ml-2 whitespace-nowrap overflow-hidden"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Facing an issue?
        </motion.p>
      </Link>
    </motion.div>
  );
};
