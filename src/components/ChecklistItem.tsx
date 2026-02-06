import type { ChecklistItem as ChecklistItemType } from '../types';

interface ChecklistItemProps {
  item: ChecklistItemType;
  isCompleted?: boolean;
  onToggle?: (itemId: string) => void;
  index: number;
  readOnly?: boolean;
}

function renderFormattedText(text: string) {
  // Split by **bold** markers and #channel-name patterns
  const parts = text.split(/(\*\*[^*]+\*\*|#[\w-]+)/g);
  return parts.map((part, i) => {
    if (/^#[\w-]+$/.test(part)) {
      return <code key={i} className="channel-tag">{part}</code>;
    }
    if (/^\*\*.+\*\*$/.test(part)) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChecklistItem({ item, isCompleted, onToggle, readOnly }: ChecklistItemProps) {
  const completed = isCompleted ?? false;

  return (
    <div
      className={`checklist-item ${completed ? 'checklist-item--completed' : ''} ${readOnly ? 'checklist-item--readonly' : ''}`}
      onClick={readOnly ? undefined : () => onToggle?.(item.id)}
      role={readOnly ? undefined : 'button'}
      tabIndex={readOnly ? undefined : 0}
      onKeyDown={readOnly ? undefined : (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle?.(item.id); } }}
    >
      {!readOnly && (
        <span className={`checklist-checkbox ${completed ? 'checklist-checkbox--checked' : ''}`}>
          {completed && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
      )}
      <span className={`item-content ${item.photo ? 'item-content--with-photo' : ''}`}>
        {item.icon && (
          <img
            src={`${import.meta.env.BASE_URL}${item.icon}`}
            alt=""
            className="item-icon"
          />
        )}
        {item.photo && (
          <img
            src={`${import.meta.env.BASE_URL}${item.photo}`}
            alt=""
            className="item-avatar"
          />
        )}
        <span className={`item-text ${completed ? 'item-text--completed' : ''}`}>
          {renderFormattedText(item.text)}
        </span>
      </span>
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="item-link"
          onClick={(e) => e.stopPropagation()}
        >
          {item.linkText || 'Link'} ↗
        </a>
      )}

      <style>{`
        .checklist-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.07);
          color: var(--text-primary);
          border-radius: 12px;
          margin-bottom: 8px;
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          user-select: none;
          backdrop-filter: blur(12px);
        }

        .checklist-item--readonly {
          cursor: default;
        }

        .checklist-item:not(.checklist-item--readonly):hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .checklist-item--completed {
          background: color-mix(in srgb, var(--success-color) 10%, transparent);
          border-color: color-mix(in srgb, var(--success-color) 25%, transparent);
        }

        .checklist-checkbox {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          min-width: 22px;
          border-radius: 6px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: transparent;
          transition: all 0.2s ease;
          color: var(--color-white);
        }

        .checklist-item:hover .checklist-checkbox:not(.checklist-checkbox--checked) {
          border-color: var(--color-smoothie);
        }

        .checklist-checkbox--checked {
          background: var(--success-color);
          border-color: var(--success-color);
        }

        .item-text {
          font-size: 15px;
          line-height: 1.5;
          color: var(--text-primary);
          transition: all 0.2s ease;
        }

        .item-text--completed {
          color: var(--text-muted);
          text-decoration: line-through;
          text-decoration-color: color-mix(in srgb, var(--text-muted) 40%, transparent);
        }

        .item-link {
          color: var(--color-smoothie);
          font-weight: 500;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
          margin-left: auto;
        }

        .item-link:hover {
          color: var(--color-smoothie-2);
        }

        .item-content {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }

        .item-icon {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          object-fit: contain;
        }

        .item-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          border: 2px solid rgba(255, 255, 255, 0.15);
        }

        .channel-tag {
          display: inline;
          background: color-mix(in srgb, var(--color-acai) 25%, transparent);
          color: var(--color-smoothie);
          padding: 2px 7px;
          border-radius: 5px;
          font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.01em;
          border: 1px solid color-mix(in srgb, var(--color-acai) 25%, transparent);
        }

        /* ── Inverted (light) theme overrides ── */
        .section-scroll-target--inverted .checklist-item {
          background: #f3f4f6;
          color: #1a1a1a;
          border-color: rgba(0, 0, 0, 0.08);
          backdrop-filter: none;
        }

        .section-scroll-target--inverted .checklist-item:not(.checklist-item--readonly):hover {
          background: #e5e7eb;
          border-color: rgba(0, 0, 0, 0.12);
        }

        .section-scroll-target--inverted .checklist-item--completed {
          background: color-mix(in srgb, var(--success-color) 8%, #f3f4f6);
          border-color: color-mix(in srgb, var(--success-color) 20%, transparent);
        }

        .section-scroll-target--inverted .checklist-checkbox {
          border-color: rgba(0, 0, 0, 0.25);
          color: #ffffff;
        }

        .section-scroll-target--inverted .checklist-item:hover .checklist-checkbox:not(.checklist-checkbox--checked) {
          border-color: var(--color-acai);
        }

        .section-scroll-target--inverted .item-text {
          color: #1a1a1a;
        }

        .section-scroll-target--inverted .item-text--completed {
          color: #6b7280;
          text-decoration-color: color-mix(in srgb, #6b7280 40%, transparent);
        }

        .section-scroll-target--inverted .item-link {
          color: var(--color-acai);
        }

        .section-scroll-target--inverted .item-link:hover {
          color: var(--color-deelberry);
        }

        .section-scroll-target--inverted .item-avatar {
          border-color: rgba(0, 0, 0, 0.1);
        }

        .section-scroll-target--inverted .channel-tag {
          background: color-mix(in srgb, var(--color-acai) 12%, transparent);
          color: var(--color-acai);
          border-color: color-mix(in srgb, var(--color-acai) 15%, transparent);
        }
      `}</style>
    </div>
  );
}
