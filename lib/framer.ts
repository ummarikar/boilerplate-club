export const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.3 * index,
    },
  }),
};

export const left = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

export const right = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 100 },
};

export const transition = {
  ease: "easeOut",
  duration: 1,
};
