import { motion } from "motion/react";

export const LoadingSpinner = () => {
  return (
    <motion.div
      className="h-40 bg-muted rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin" />
      </div>
    </motion.div>
  );
};
