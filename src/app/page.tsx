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
  const goal = 100;
  const [animation, setAnimation] = useState("initial");

  console.log(
    "process.env.COUNT_API_URL",
    process.env.NEXT_PUBLIC_COUNT_API_URL,
  );

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_COUNT_API_URL) return;
    const fetchCount = () => {
      fetch(process.env.NEXT_PUBLIC_COUNT_API_URL!)
        .then((res) => res.json())
        .then((data: number) => {
          if (data > count) {
            setAnimation("updated");
          }
          setCount(data);
        })
        .catch((err) => console.error("Error fetching count:", err));
    };

    fetchCount();
    const intervalId = setInterval(fetchCount, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  useEffect(() => {
    if (animation === "updated") {
      setTimeout(() => setAnimation("initial"), 300);
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
