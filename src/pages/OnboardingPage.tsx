import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { SectionCard } from '../components/SectionCard';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { CompletionScreen } from '../components/CompletionScreen';
import { useProgress } from '../hooks/useProgress';
import { useOnboardingData } from '../hooks/useOnboardingData';
import { sections } from '../data/defaultContent';
import { sectionBgPalette } from '../tokens/colors';

// Hash helper (mirrors the one in useProgress)
function hashStr(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export function OnboardingPage() {
  const [searchParams] = useSearchParams();
  const encodedData = searchParams.get('data') || '';
  const onboardingData = useOnboardingData(encodedData);

  // Track whether the user has dismissed the welcome screen
  const introKey = `onboard_intro_seen_${hashStr(encodedData || 'default')}`;
  const isFirstVisit = (() => {
    try { return !localStorage.getItem(introKey); } catch { return true; }
  })();

  // showWelcome  = the overlay component is mounted
  // checklistReady = sidebar/main should animate to visible
  const [showWelcome, setShowWelcome] = useState(isFirstVisit);
  const [checklistReady, setChecklistReady] = useState(!isFirstVisit);

  // Called when the welcome backdrop starts dissolving – begin checklist reveal
  const handleReveal = useCallback(() => {
    try { localStorage.setItem(introKey, '1'); } catch { /* noop */ }
    setChecklistReady(true);
  }, [introKey]);

  // Called after the backdrop is fully transparent – safe to unmount
  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const scrollContainerRef = useRef<HTMLElement>(null);
  // When a sidebar click triggers a multi-section scroll we track the target
  // so the IntersectionObserver ignores every intermediate section and the
  // background colour transitions once, directly to the destination.
  const navTargetRef = useRef<string | null>(null);

  const {
    progress,
    toggleItem,
    isItemCompleted,
    setLastVisited,
    getSectionProgress,
    totalCompleted,
  } = useProgress(encodedData || 'default');

  // Build filtered sections: replace or hide "other-actions" based on custom tasks
  const filteredSections = useMemo(() => {
    const customTasks = onboardingData.customTasks || [];

    if (customTasks.length === 0) {
      // Hide the "Other Actions" section entirely
      return sections.filter((s) => s.id !== 'other-actions');
    }

    // Replace the placeholder items with the admin-defined custom tasks
    return sections.map((s) => {
      if (s.id !== 'other-actions') return s;
      return {
        ...s,
        subsections: [
          {
            title: 'Custom tasks',
            items: customTasks.map((task, i) => ({
              id: `custom-task-${i}`,
              text: task.text,
              ...(task.link ? { link: task.link, linkText: 'Open' } : {}),
            })),
          },
        ],
      };
    });
  }, [onboardingData.customTasks]);

  const [currentSectionId, setCurrentSectionId] = useState(
    () => progress.lastVisited || filteredSections[0]?.id || sections[0].id
  );
  const [hasCompletedAll, setHasCompletedAll] = useState(false);
  const prevSectionRef = useRef<string>(currentSectionId);

  // Rotating background colour based on which sheet is active
  const currentSectionIndex = useMemo(() => {
    const idx = filteredSections.findIndex((s) => s.id === currentSectionId);
    return idx >= 0 ? idx : 0;
  }, [filteredSections, currentSectionId]);

  const currentBgColor =
    sectionBgPalette[currentSectionIndex % sectionBgPalette.length];

  // Calculate total items (exclude readOnly subsections)
  const totalItems = useMemo(() => {
    return filteredSections.reduce((acc, section) => {
      return acc + section.subsections
        .filter((sub) => !sub.readOnly)
        .reduce((subAcc, sub) => subAcc + sub.items.length, 0);
    }, 0);
  }, [filteredSections]);

  // Detect when all items are completed
  useEffect(() => {
    if (totalCompleted === totalItems && totalItems > 0 && !hasCompletedAll) {
      setHasCompletedAll(true);
    }
  }, [totalCompleted, totalItems, hasCompletedAll]);

  // Scroll spy: track which section is in view via scroll events.
  // More reliable with scroll-snap than IntersectionObserver.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sectionEls = container.querySelectorAll('.section-scroll-target');
      const containerTop = container.getBoundingClientRect().top;

      let bestId: string | null = null;
      let bestDistance = Infinity;

      sectionEls.forEach((el) => {
        const distance = Math.abs(el.getBoundingClientRect().top - containerTop);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = el.id;
        }
      });

      if (!bestId) return;

      // If programmatic navigation is in progress, only update when we arrive
      if (navTargetRef.current) {
        if (bestId === navTargetRef.current) {
          navTargetRef.current = null;
        } else {
          return;
        }
      }

      if (bestId !== prevSectionRef.current) {
        prevSectionRef.current = bestId;
        setCurrentSectionId(bestId);
        setLastVisited(bestId);
        // Reset the arriving section's internal scroll to the top
        const sectionEl = container.querySelector(`#${bestId}`) as HTMLElement | null;
        if (sectionEl) sectionEl.scrollTop = 0;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [setLastVisited]);

  // Sidebar click: jump the colour immediately then smooth-scroll the content.
  const handleSectionChange = useCallback(
    (sectionId: string) => {
      const container = scrollContainerRef.current;
      if (!container) return;
      const el = container.querySelector(`#${sectionId}`) as HTMLElement | null;
      if (!el) return;

      // Lock the scroll handler so intermediate sections are skipped
      navTargetRef.current = sectionId;
      prevSectionRef.current = sectionId;

      // Immediately adopt the target colour (no intermediate flashing)
      setCurrentSectionId(sectionId);
      setLastVisited(sectionId);

      el.scrollTop = 0;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [setLastVisited],
  );

  return (
    <div className="onboarding-layout">
      {/* Welcome overlay – stays mounted through its full dissolve animation */}
      {showWelcome && (
        <WelcomeScreen
          name={onboardingData.name}
          onReveal={handleReveal}
          onComplete={handleWelcomeComplete}
        />
      )}

      <motion.aside
        className="sidebar-entrance"
        initial={checklistReady ? false : { x: -40, opacity: 0 }}
        animate={checklistReady ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
      >
        <Sidebar
          currentSection={currentSectionId}
          onSectionChange={handleSectionChange}
          getSectionProgress={getSectionProgress}
          totalProgress={{ completed: totalCompleted, total: totalItems }}
          userName={onboardingData.name}
          sections={filteredSections}
          sectionColors={sectionBgPalette}
        />
      </motion.aside>

      <motion.main
        className="main-content"
        ref={scrollContainerRef}
        initial={checklistReady ? false : { opacity: 0 }}
        animate={
          checklistReady
            ? { opacity: 1, backgroundColor: currentBgColor }
            : { opacity: 0, backgroundColor: currentBgColor }
        }
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
      >
        {onboardingData.customMessage && (
          <div className="welcome-banner">
            <p>{onboardingData.customMessage}</p>
          </div>
        )}

        {filteredSections.map((section, index) => (
          <div key={section.id} id={section.id} className="section-scroll-target">
            <SectionCard
              section={section}
              isItemCompleted={isItemCompleted}
              onToggleItem={toggleItem}
              onboardingData={onboardingData}
            />
          </div>
        ))}

      </motion.main>

      {/* Full-screen completion celebration */}
      {hasCompletedAll && (
        <CompletionScreen name={onboardingData.name} />
      )}

      <style>{`
        .onboarding-layout {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        .sidebar-entrance {
          /* Transparent wrapper – Sidebar handles its own positioning */
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
          will-change: transform, opacity;
        }

        .main-content {
          flex: 1;
          margin-left: var(--sidebar-width);
          overflow-y: auto;
          overflow-x: hidden;
          scroll-snap-type: y mandatory;
          -webkit-overflow-scrolling: touch;
        }

        @media (prefers-reduced-motion: no-preference) {
          .main-content {
            scroll-behavior: smooth;
          }
        }

        .welcome-banner {
          padding: 16px 40px;
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-subtle);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .welcome-banner p {
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
        }

        .section-scroll-target {
          height: 100vh;
          overflow-y: auto;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          will-change: scroll-position;
          background: transparent;
        }

      `}</style>
    </div>
  );
}
