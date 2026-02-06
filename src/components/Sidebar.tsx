import { Progress } from '@heroui/react';
import { motion } from 'framer-motion';
import type { Section } from '../types';
import deelLogo from '../assets/deel-logo.png';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
  getSectionProgress: (itemIds: string[]) => {
    completed: number;
    total: number;
    percentage: number;
    isComplete: boolean;
  };
  totalProgress: { completed: number; total: number };
  userName: string;
  sections: Section[];
  sectionColors: readonly string[];
}

function getSectionItemIds(section: Section): string[] {
  return section.subsections
    .filter((sub) => !sub.readOnly)
    .flatMap((sub) => sub.items.map((item) => item.id));
}

export function Sidebar({
  currentSection,
  onSectionChange,
  getSectionProgress,
  totalProgress,
  userName,
  sections,
  sectionColors,
}: SidebarProps) {
  const overallPercentage = totalProgress.total > 0 
    ? Math.round((totalProgress.completed / totalProgress.total) * 100) 
    : 0;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={deelLogo} alt="Deel" className="sidebar-logo" />
        <div className="welcome-text">
          Welcome, <strong>{userName}</strong>
        </div>
      </div>

      <div className="progress-overview">
        <div className="progress-header">
          <span>Progress</span>
          <span className="progress-count">{totalProgress.completed}/{totalProgress.total}</span>
        </div>
        <Progress
          value={overallPercentage}
          color="secondary"
          size="sm"
          className="progress-bar"
        />
        <div className="progress-percentage">{overallPercentage}%</div>
      </div>

      <nav className="section-nav">
        {sections.map((section, index) => {
          const itemIds = getSectionItemIds(section);
          const progress = getSectionProgress(itemIds);
          const isActive = currentSection === section.id;

          return (
            <motion.button
              key={section.id}
              className={`section-item ${isActive ? 'active' : ''} ${progress.isComplete ? 'complete' : ''}`}
              onClick={() => onSectionChange(section.id)}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
              style={isActive ? { background: `color-mix(in srgb, ${sectionColors[index % sectionColors.length]} 12%, transparent)` } : undefined}
            >
              <span className="section-status" aria-hidden>
                {progress.isComplete ? (
                  <span className="section-status-dot complete" />
                ) : (
                  <span className="section-status-dot" />
                )}
              </span>
              <div className="section-info">
                <span className="sidebar-section-title">{section.title}</span>
                {progress.total > 0 && (
                  <span className="section-progress">{progress.completed}/{progress.total}</span>
                )}
              </div>

            </motion.button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p>Reach out to your line manager or onboarding buddy if you need help.</p>
      </div>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--bg-card-warm);
          color: var(--card-text-primary);
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
          overflow: hidden;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
        }

        .sidebar-header {
          padding: 16px 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .sidebar-logo {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          object-fit: cover;
          margin-bottom: 8px;
        }

        .welcome-text {
          font-size: 13px;
          color: var(--card-text-secondary);
        }

        .welcome-text strong {
          color: var(--card-text-primary);
          font-weight: 500;
        }

        .progress-overview {
          padding: 12px 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--card-text-secondary);
        }

        .progress-count {
          font-weight: 600;
          color: var(--card-text-primary);
          font-size: 13px;
        }

        .progress-bar {
          margin-bottom: 4px;
        }

        .progress-percentage {
          font-size: 12px;
          color: var(--card-text-secondary);
          text-align: right;
        }

        .section-nav {
          flex: 1;
          overflow-y: auto;
          padding: 8px 8px;
        }

        .section-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          margin-bottom: 1px;
          border: none;
          border-radius: 6px;
          background: transparent;
          color: var(--card-text-secondary);
          cursor: pointer;
          position: relative;
          text-align: left;
          transition: background 0.12s ease, color 0.12s ease;
        }

        .section-item:hover {
          background: rgba(0, 0, 0, 0.04);
          color: var(--card-text-primary);
        }

        .section-item.active {
          color: var(--card-text-primary);
        }

        .section-status {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 6px;
          height: 6px;
        }

        .section-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.15);
        }

        .section-status-dot.complete {
          background: var(--success-color);
        }

        .section-info {
          flex: 1;
          min-width: 0;
        }

        .sidebar-section-title {
          display: block;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
          letter-spacing: 0.01em;
        }

        .section-progress {
          display: block;
          font-size: 12px;
          color: var(--card-text-secondary);
          margin-top: 1px;
        }

        .sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          font-size: 12px;
          color: var(--card-text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </aside>
  );
}
