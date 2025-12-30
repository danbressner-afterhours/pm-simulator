import { useDroppable } from '@dnd-kit/core';
import TicketCard from './TicketCard';
import { getFeatureById } from '../data/scenario';
import './SprintColumn.css';

const SprintColumn = ({ id, title, featureIds, devCapacity, usedCapacity }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const features = featureIds.map(fid => getFeatureById(fid)).filter(Boolean);

  const isOverCapacity = usedCapacity > devCapacity;
  const isNearCapacity = usedCapacity === devCapacity;

  return (
    <div className={`sprint-column ${isOver ? 'drag-over' : ''}`}>
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        {devCapacity && (
          <div className={`capacity-indicator ${isOverCapacity ? 'over' : isNearCapacity ? 'full' : ''}`}>
            <span className="capacity-used">{usedCapacity}</span>
            <span className="capacity-divider">/</span>
            <span className="capacity-total">{devCapacity}</span>
            <span className="capacity-unit">mo</span>
          </div>
        )}
      </div>

      <div
        ref={setNodeRef}
        className={`column-dropzone ${isOver ? 'active' : ''}`}
      >
        {features.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <p className="empty-text">Drag tickets here</p>
          </div>
        ) : (
          features.map((feature) => (
            <TicketCard key={feature.id} feature={feature} />
          ))
        )}
      </div>

      {isOverCapacity && (
        <div className="capacity-warning">
          ⚠️ Over capacity!
        </div>
      )}
    </div>
  );
};

export default SprintColumn;
