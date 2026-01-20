import type { Easing, TargetAndTransition, Variants } from "framer-motion"

/** Smooth deceleration curve for enter animations */
const easeOut: Easing = [0.16, 1, 0.3, 1]

/** Coerce null to false for reduced motion preference */
function shouldReduce(reduceMotion: boolean | null): boolean {
  return reduceMotion === true
}

export function createFadeUp(
  reduceMotion: boolean | null,
  distance = 24,
  duration = 0.6,
): Variants {
  const reduce = shouldReduce(reduceMotion)
  return {
    hidden: { opacity: 0, y: reduce ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : duration,
        ease: easeOut,
      },
    },
  }
}

export function createFadeIn(
  reduceMotion: boolean | null,
  duration = 0.6,
): Variants {
  const reduce = shouldReduce(reduceMotion)
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reduce ? 0 : duration,
        ease: easeOut,
      },
    },
  }
}

export function createStagger(
  reduceMotion: boolean | null,
  stagger = 0.12,
  delayChildren = 0.1,
): Variants {
  const reduce = shouldReduce(reduceMotion)
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  }
}

/**
 * Creates a smooth floating animation using sine-wave-like motion.
 * Uses longer duration and mirror repeat for buttery-smooth looping.
 */
export function createFloatAnimation(
  reduceMotion: boolean | null,
  distance = 10,
): TargetAndTransition {
  if (shouldReduce(reduceMotion)) {
    return {}
  }
  return {
    y: -distance,
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: [0.45, 0, 0.55, 1], // sine in-out for smooth reversal
    },
  }
}
