import type { Section, OnboardingData } from '../types';
import { ChecklistItem } from './ChecklistItem';

interface SectionCardProps {
  section: Section;
  isItemCompleted: (itemId: string) => boolean;
  onToggleItem: (itemId: string) => void;
  onboardingData: OnboardingData;
}

export function SectionCard({
  section,
  isItemCompleted,
  onToggleItem,
  onboardingData,
}: SectionCardProps) {
  const allItemIds = section.subsections
    .filter((sub) => !sub.readOnly)
    .flatMap((sub) => sub.items.map((item) => item.id));
  const completedCount = allItemIds.filter(isItemCompleted).length;
  const progressPercentage = allItemIds.length > 0 ? (completedCount / allItemIds.length) * 100 : 0;

  return (
    <div className="section-card">
      <header className="section-header">
        <div className="section-header-content">
          {section.icon ? <span className="section-icon-large">{section.icon}</span> : null}
          <div>
            <h1 className="section-title">{section.title}</h1>
            {section.description && (
              <p className="section-description">{section.description}</p>
            )}
          </div>
        </div>
        {allItemIds.length > 0 && (
          <div className="section-progress-badge">
            <span className="progress-text">{completedCount} / {allItemIds.length}</span>
            <div className="progress-ring">
              <svg viewBox="0 0 36 36">
                <path
                  className="progress-ring-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="progress-ring-fill"
                  strokeDasharray={`${progressPercentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
        )}
      </header>

      <div className="section-content">
        {/* Render personalized info for specific sections */}
        {section.id === 'line-manager-actions' && (
          <div className="info-cards">
            {onboardingData.lineManager && (
              <div className="info-card">
                <span className="info-label">Your Line Manager</span>
                <span className="info-value">{onboardingData.lineManager}</span>
              </div>
            )}
            {onboardingData.onboardingBuddy && (
              <div className="info-card">
                <span className="info-label">Your Onboarding Buddy</span>
                <span className="info-value">{onboardingData.onboardingBuddy}</span>
              </div>
            )}
          </div>
        )}

        {section.subsections.map((subsection, subIndex) => (
          <div key={subIndex} className="subsection">
            <h2 className="subsection-title">{subsection.title}</h2>
            <div className="checklist-items">
              {subsection.items.map((item, itemIndex) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  isCompleted={subsection.readOnly ? undefined : isItemCompleted(item.id)}
                  onToggle={subsection.readOnly ? undefined : onToggleItem}
                  index={itemIndex}
                  readOnly={subsection.readOnly}
                />
              ))}
            </div>
          </div>
        ))}

      </div>

      <style>{`
        .section-card {
          padding: 40px;
          padding-left: 64px;
          background: transparent;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .section-header-content {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .section-icon-large {
          font-size: 48px;
          line-height: 1;
        }

        .section-title {
          font-size: 44px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.92);
          margin: 0 0 8px 0;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .section-description {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
          max-width: 600px;
          line-height: 1.5;
        }

        .section-progress-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-card);
          padding: 12px 20px;
          border-radius: 16px;
          color: var(--card-text-primary);
          border: 1px solid var(--border-card);
          box-shadow: 0 2px 8px var(--shadow-color);
        }

        .progress-text {
          font-size: 18px;
          font-weight: 500;
        }

        .progress-ring {
          width: 40px;
          height: 40px;
        }

        .progress-ring svg {
          transform: rotate(-90deg);
        }

        .progress-ring-bg {
          fill: none;
          stroke: rgba(0, 0, 0, 0.08);
          stroke-width: 3;
        }

        .progress-ring-fill {
          fill: none;
          stroke: var(--color-acai);
          stroke-width: 3;
          stroke-linecap: round;
          transition: stroke-dasharray 0.5s ease;
        }

        .section-content {
          max-width: 800px;
        }

        .info-cards {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }

        .info-card {
          flex: 1;
          padding: 20px;
          background: rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .info-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .info-value {
          font-size: 18px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .subsection {
          margin-bottom: 32px;
        }

        .subsection-title {
          font-size: 18px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .checklist-items {
          display: flex;
          flex-direction: column;
        }

        .additional-content {
          margin-top: 32px;
          padding-top: 32px;
          border-top: 1px solid var(--border-subtle);
        }

        .additional-title {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0 0 16px 0;
        }

        .people-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }

        .person-card {
          display: flex;
          flex-direction: column;
          padding: 16px;
          background: var(--bg-card);
          border-radius: 12px;
          border: 1px solid var(--border-card);
          box-shadow: 0 2px 8px var(--shadow-color);
          color: var(--card-text-primary);
        }

        .person-card--with-photo {
          flex-direction: row;
          align-items: center;
          gap: 14px;
        }

        .person-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid rgba(0, 0, 0, 0.08);
        }

        .person-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .person-name {
          font-weight: 500;
          color: var(--card-text-primary);
          margin-bottom: 2px;
        }

        .person-team {
          font-size: 13px;
          color: var(--card-text-primary);
          margin-bottom: 1px;
        }

        .person-role {
          font-size: 12px;
          color: var(--card-text-secondary);
        }

        /* ── Inverted (light) theme overrides ── */
        .section-scroll-target--inverted .section-header {
          border-bottom-color: rgba(0, 0, 0, 0.10);
        }

        .section-scroll-target--inverted .section-title {
          color: #1a1a1a;
        }

        .section-scroll-target--inverted .section-description {
          color: #4b5563;
        }

        .section-scroll-target--inverted .subsection-title {
          color: #1a1a1a;
        }

        .section-scroll-target--inverted .info-card {
          background: rgba(0, 0, 0, 0.04);
          border-color: rgba(0, 0, 0, 0.08);
        }

        .section-scroll-target--inverted .info-label {
          color: #6b7280;
        }

        .section-scroll-target--inverted .info-value {
          color: #1a1a1a;
        }
      `}</style>
    </div>
  );
}
