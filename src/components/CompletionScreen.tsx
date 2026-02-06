import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { celebrationColors } from '../tokens/colors';

interface CompletionScreenProps {
  name: string;
}

const ease = [0.4, 0, 0.2, 1] as const;

export function CompletionScreen({ name }: CompletionScreenProps) {
  const confettiFired = useRef(false);

  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;

    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: [...celebrationColors],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: [...celebrationColors],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      className="completion-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease }}
    >
      {/* Ambient glow */}
      <motion.div
        className="completion-glow"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />

      <motion.div
        className="completion-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
      >
        <motion.span
          className="completion-label"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Onboarding Complete
        </motion.span>

        <motion.h1
          className="completion-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          All done, {name}!
        </motion.h1>

        <motion.p
          className="completion-subheading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          Are you ready to get stuck in?
        </motion.p>
      </motion.div>

      <style>{`
        .completion-screen {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #1B1B1B 0%, #201547 50%, #1a0a5c 100%);
          overflow: hidden;
        }

        .completion-glow {
          position: absolute;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(92, 45, 145, 0.35) 0%, transparent 70%);
          pointer-events: none;
          will-change: transform, opacity;
        }

        .completion-content {
          position: relative;
          text-align: center;
          max-width: 560px;
          padding: 0 24px;
        }

        .completion-label {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-smoothie);
          margin-bottom: 20px;
        }

        .completion-heading {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 16px 0;
          line-height: 1.15;
        }

        .completion-subheading {
          font-size: clamp(17px, 2.2vw, 22px);
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </motion.div>
  );
}
