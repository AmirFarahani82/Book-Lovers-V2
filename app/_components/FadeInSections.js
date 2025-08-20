"use client";

import { useInView } from "react-intersection-observer";

function FadeInSections({ children }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1500 ${inView ? "translate-y-0 opacity-100" : "translate-y-[200px] opacity-0"}`}
    >
      {children}
    </div>
  );
}

export default FadeInSections;
