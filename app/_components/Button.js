"use client";

import Link from "next/link";

function Button({ children, buttonRef, type, path, onClick }) {
  if (type === "link") {
    return (
      <Link
        ref={buttonRef}
        href={path}
        className="rounded-md bg-purple-500 px-2 py-2 text-[12px] text-white transition-all duration-400 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-97 md:rounded-xl md:px-4 md:py-2.5 md:text-lg"
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      ref={buttonRef}
      className="rounded-md bg-purple-500 px-2 py-2 text-[12px] text-white transition-all duration-400 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-97 md:rounded-xl md:px-4 md:py-2.5 md:text-lg"
    >
      {children}
    </button>
  );
}

export default Button;
