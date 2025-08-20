"use client";
import { useState } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}
      <button
        className="cursor-pointer border-b border-purple-500 pr-1 text-purple-500"
        onClick={() => setIsExpanded((e) => !e)}
      >
        {isExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
      </button>
    </span>
  );
}

export default TextExpander;
