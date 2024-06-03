"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const countVariants = {
  updated: { scale: 1.2, transition: { duration: 0.3 } },
  initial: { scale: 1 },
};
const milestoneVariants = {
  visible: { opacity: 1, y: 100, transition: { duration: 0.1 }, scale: 2.0 },
  hidden: { opacity: 0, y: -50 },
};
const milestones = Array.from({ length: 100 }, (_, i) => (i + 1) * 1000);

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [animation, setAnimation] = useState("initial");
  const [milestone, setMilestone] = useState<number | null>(null);
  const [lastFetchedCount, setLastFetchedCount] = useState(0);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_COUNT_API_URL) return;
    const fetchCount = () => {
      fetch(process.env.NEXT_PUBLIC_COUNT_API_URL!, { mode: "cors" })
        .then((res) => {
          return res.json();
        })
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

  useEffect(() => {
    setLastFetchedCount(count);
    milestones.forEach((m) => {
      if (count >= m && lastFetchedCount < m) {
        setMilestone(m);
      }
    });
  }, [count, lastFetchedCount]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      {milestone && (
        <>
          <Confetti width={width} height={height} />
          <motion.span
            className="absolute top-10 rounded p-4 text-8xl font-bold text-yellow-400"
            variants={milestoneVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onAnimationComplete={() =>
              setTimeout(() => setMilestone(null), 10000)
            }
          >
            {milestone}
          </motion.span>
        </>
      )}
      <motion.span
        className="inline-block rounded-lg p-4 text-[12rem] font-semibold text-blue-500"
        variants={countVariants}
        animate={animation}
      >
        {count}
      </motion.span>
    </div>
  );
}
