"use client";

import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionDivProps extends MotionProps {
  children?: React.ReactNode;
  className?: string;
}

const MotionDiv = motion.create(
  ({ children, className, ...props }: MotionDivProps) => {
    return (
      <motion.div className={cn(className)} {...props}>
        {children}
      </motion.div>
    );
  }
);

export default MotionDiv;