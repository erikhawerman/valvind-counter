"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProgressBar from "./components/ProgressBar";

const countVariants = {
  updated: { scale: 1.2, transition: { duration: 0.3 } },
  initial: { scale: 1 },
};
export default function HomePage() {
  const [count, setCount] = useState(0);
  const goal = 100; // Set your goal here, adjust according to your target
  const [animation, setAnimation] = useState("initial");

  useEffect(() => {
    const fetchCount = () => {
      fetch("https://localhost:61949/api/interaction-counter?apiKey=abc123")
        .then((res) => res.json())
        .then((data: number) => {
          if (data > count) {
            setAnimation("updated"); // Trigger the animation when the count increases
          }
          setCount(data);
        })
        .catch((err) => console.error("Error fetching count:", err));
    };

    fetchCount();
    const intervalId = setInterval(fetchCount, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [count]); // Depend on count to decide when to trigger animation

  useEffect(() => {
    if (animation === "updated") {
      setTimeout(() => setAnimation("initial"), 300); // Reset animation state after it plays
    }
  }, [animation]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <motion.span
        className="inline-block rounded-lg p-4 text-[12rem] font-semibold text-blue-500"
        variants={countVariants}
        animate={animation}
      >
        {count}
      </motion.span>
      <ProgressBar progress={(count / goal) * 100} />
    </div>
  );
}
