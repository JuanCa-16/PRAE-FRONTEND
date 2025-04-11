import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedCounter = ({ from = 0, to = 0, duration = 1 }) => {
  const [current, setCurrent] = useState(from);
  const motionValue = useMotionValue(from);

  useEffect(() => {

    const toNumber = Number(to) || 0;

    // motionValue.set(0); // 👈 Resetea a 0 ANTES de animar

    const controls = animate(motionValue, toNumber, {
      duration: duration,
      ease: "easeInOut",
      onUpdate: (value) => {
        setCurrent(Math.round(value));
      }
    });

    return controls.stop; // Limpieza
  }, [to, from, duration, motionValue]);

  return (
    <motion.span>
      {current}
    </motion.span>
  );
};

export default AnimatedCounter;
