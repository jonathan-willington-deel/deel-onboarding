import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  name: string;
  /** Called when the backdrop starts dissolving – parent should begin revealing the checklist */
  onReveal: () => void;
  /** Called when fully invisible – safe to unmount */
  onComplete: () => void;
}

/**
 * Three visual phases, one AnimatePresence:
 *  content  → user sees the welcome copy + CTA
 *  loading  → content exits, loader enters (mode="wait")
 *  dissolve → loader exits, backdrop fades to transparent
 */
type Phase = 'content' | 'loading' | 'dissolve';

const ease = [0.4, 0, 0.2, 1] as const;

export function WelcomeScreen({ name, onReveal, onComplete }: WelcomeScreenProps) {
  const [phase, setPhase] = useState<Phase>('content');
  const revealFired = useRef(false);

  const handleClick = useCallback(() => {
    if (phase === 'content') setPhase('loading');
  }, [phase]);

  // After the loading bar has played, start dissolving
  const startDissolve = useCallback(() => {
    setPhase('dissolve');
    // Tell the parent to start the checklist entrance now
    if (!revealFired.current) {
      revealFired.current = true;
      onReveal();
    }
  }, [onReveal]);

  return (
    <motion.div
      className="welcome-screen"
      animate={{ opacity: phase === 'dissolve' ? 0 : 1 }}
      transition={{ duration: 0.7, ease }}
      onAnimationComplete={() => {
        if (phase === 'dissolve') onComplete();
      }}
    >
      {/* Ambient glow */}
      <motion.div
        className="welcome-glow"
        animate={{
          scale: phase === 'content' ? 1 : 1.6,
          opacity: phase === 'dissolve' ? 0 : phase === 'loading' ? 0.4 : 0.25,
        }}
        transition={{ duration: 1.2, ease }}
      />

      {/* Content / Loading swap – mode="wait" ensures exit completes before enter */}
      <AnimatePresence mode="wait">
        {phase === 'content' && (
          <motion.div
            key="content"
            className="welcome-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -44, scale: 0.97, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease }}
          >
            <motion.span
              className="welcome-label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Onboarding
            </motion.span>

            <motion.h1
              className="welcome-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
            >
              Welcome, {name}!
            </motion.h1>

            <motion.p
              className="welcome-subheading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Here's everything you need to get started at Deel.
            </motion.p>

            <motion.button
              className="welcome-cta"
              onClick={handleClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get started
            </motion.button>
          </motion.div>
        )}

        {phase === 'loading' && (
          <motion.div
            key="loading"
            className="welcome-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <motion.div
              className="loader-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease }}
              onAnimationComplete={startDissolve}
            />
            <motion.span
              className="loader-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12, duration: 0.3 }}
            >
              Preparing your checklist…
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .welcome-screen {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #1B1B1B 0%, #201547 50%, #1a0a5c 100%);
          overflow: hidden;
          will-change: opacity;
        }

        .welcome-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(92, 45, 145, 0.3) 0%, transparent 70%);
          pointer-events: none;
          will-change: transform, opacity;
        }

        .welcome-content {
          position: relative;
          text-align: center;
          max-width: 520px;
          padding: 0 24px;
          will-change: transform, opacity, filter;
        }

        .welcome-label {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-smoothie);
          margin-bottom: 20px;
        }

        .welcome-heading {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 16px 0;
          line-height: 1.15;
        }

        .welcome-subheading {
          font-size: clamp(17px, 2.2vw, 20px);
          color: var(--text-secondary);
          margin: 0 0 44px 0;
          line-height: 1.5;
        }

        .welcome-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 44px;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--color-white) !important;
          background: var(--color-acai) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 24px rgba(92, 45, 145, 0.35);
        }

        .welcome-cta:hover {
          background: var(--color-acai-2) !important;
          box-shadow: 0 6px 32px rgba(92, 45, 145, 0.5);
        }

        .welcome-cta:active {
          background: var(--color-deelberry) !important;
        }

        /* Loading phase */
        .welcome-loader {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .loader-bar {
          width: 160px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--color-acai), var(--color-smoothie));
          transform-origin: left center;
          will-change: transform;
        }

        .loader-text {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: var(--text-secondary);
        }
      `}</style>
    </motion.div>
  );
}
