import { useDraggable } from '@dnd-kit/core';
import './TicketCard.css';

const TicketCard = ({ feature, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `ticket-${feature.id}`,
    data: { feature }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  // Determine color accent based on impact level
  const getAccentColor = (level) => {
    switch (level) {
      case 'critical': return 'var(--status-critical)';
      case 'high': return 'var(--accent-pink)';
      case 'medium': return 'var(--accent-yellow)';
      case 'low': return 'var(--text-secondary)';
      case 'unknown': return 'var(--accent-purple)';
      default: return 'var(--border)';
    }
  };

  const accentColor = getAccentColor(feature.impactLevel);

  return (
    <div
      ref={setNodeRef}
      style={{...style, borderLeftColor: accentColor}}
      className={`ticket-card ${isDragging ? 'dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      <div className="ticket-header">
        <span className="ticket-id">#{feature.id}</span>
        <span className="ticket-effort">🕐 {feature.effortMonths}mo</span>
      </div>

      <h3 className="ticket-title">{feature.title}</h3>

      <div className="ticket-meta">
        <div className="ticket-reach">
          <span className="label">Reach:</span>
          <span className="value">{feature.reach}</span>
        </div>
        <div className="ticket-impact">
          <span className="label">Impact:</span>
          <span className="value">{feature.impact}</span>
        </div>
      </div>

      <div className="ticket-tags">
        {feature.critical && <span className="tag tag-critical">CRITICAL</span>}
        {feature.urgent && <span className="tag tag-urgent">URGENT</span>}
        {feature.churnRisk && <span className="tag tag-churn">CHURN RISK</span>}
        {feature.deadline && <span className="tag tag-deadline">DEADLINE</span>}
        {feature.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="tag tag-normal">{tag}</span>
        ))}
      </div>

      <div className="ticket-stakeholder">
        <span className="stakeholder-label">👤</span>
        <span className="stakeholder-name">{feature.stakeholder}</span>
      </div>
    </div>
  );
};

export default TicketCard;
