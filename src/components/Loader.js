"use client";

import { cx } from "@/src/utils";

const Loader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cx(
          "animate-spin rounded-full border-4 border-t-transparent",
          "border-dark dark:border-light",
          sizeClasses[size]
        )}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loader;
