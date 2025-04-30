import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {useAppSelector} from "@/hooks/redux";

export default function AppPageTimer() {
  const [time, setTime] = useState(new Date())
  const clock = useAppSelector((state) => state.clock)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.h1
      className="text-7xl font-bold tracking-tight text-white"
      initial={{y: -20, opacity: 0}}
      animate={{y: 0, opacity: 1}}
      transition={{type: "spring", stiffness: 100, damping: 15}}
    >
      {time.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: clock.clockFormat === "12h",
        second: clock.isSecondShow ? "2-digit" : undefined,
      })}
    </motion.h1>
  )
}
