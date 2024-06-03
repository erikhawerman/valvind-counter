// ProgressBar.tsx
import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // progress is expected to be between 0 and 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  console.log("progress: ", progress);
  const milestones = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

  return (
    <div
      style={{
        position: "relative",
        height: "50px",
        width: "90%",
        backgroundColor: "#eee",
        borderRadius: "25px",
      }}
    >
      <motion.div
        style={{
          height: "50px",
          width: `${progress}%`,
          backgroundColor: "lightblue",
          borderRadius: "25px",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
      {milestones.map((milestone) => (
        <div
          key={milestone}
          className="absolute bottom-0 top-0 flex items-center justify-center"
          style={{
            left: `${milestone}%`,
          }}
        >
          <span
            className={`-ml-12 mt-32 text-base ${milestone <= progress ? "text-2xl font-bold text-[gold]" : "text-white"} transition-all duration-300`}
          >
            {milestone * 1000}
          </span>
        </div>
      ))}
    </div>
  );
}
