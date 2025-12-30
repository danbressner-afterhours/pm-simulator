import { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { scenario, getFeatureById, calculateTotalEffort } from '../data/scenario';
import SprintColumn from './SprintColumn';
import GameInfo from './GameInfo';
import TicketCard from './TicketCard';
import './GameBoard.css';

const GameBoard = ({
  onSubmitSprint,
  currentSprint,
  lockedSprints,
  capacityModifiers,
  previousSubmissions
}) => {
  // Initialize columns - restore previous submissions or start fresh
  const [columns, setColumns] = useState(() => {
    const initialColumns = {
      backlog: scenario.features.map(f => f.id),
      sprint1: [],
      sprint2: [],
      sprint3: []
    };

    // Restore any previous submissions
    if (previousSubmissions) {
      Object.keys(previousSubmissions).forEach(sprintKey => {
        if (previousSubmissions[sprintKey]) {
          initialColumns[sprintKey] = previousSubmissions[sprintKey];
          // Remove from backlog
          initialColumns.backlog = initialColumns.backlog.filter(
            id => !previousSubmissions[sprintKey].includes(id)
          );
        }
      });
    }

    return initialColumns;
  });

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeTicketId = active.id.replace('ticket-', '');
    const overId = over.id;

    // Find which column the ticket is currently in
    let sourceColumn = null;
    for (const [columnId, tickets] of Object.entries(columns)) {
      if (tickets.includes(parseInt(activeTicketId))) {
        sourceColumn = columnId;
        break;
      }
    }

    // If dropping on the same column, do nothing
    if (sourceColumn === overId) {
      setActiveId(null);
      return;
    }

    // Move ticket from source to target column
    setColumns(prev => {
      const newColumns = { ...prev };

      // Remove from source
      if (sourceColumn) {
        newColumns[sourceColumn] = newColumns[sourceColumn].filter(
          id => id !== parseInt(activeTicketId)
        );
      }

      // Add to target
      if (newColumns[overId]) {
        newColumns[overId] = [...newColumns[overId], parseInt(activeTicketId)];
      }

      return newColumns;
    });

    setActiveId(null);
  };

  // Calculate effort for each sprint
  const getSprintEffort = (sprintId) => {
    return calculateTotalEffort(columns[sprintId]);
  };

  // Validation for current sprint only
  const currentSprintKey = `sprint${currentSprint}`;
  const currentSprintEffort = getSprintEffort(currentSprintKey);
  const currentSprintCapacity = 3 + (capacityModifiers[currentSprintKey] || 0);
  const canSubmitSprint = currentSprintEffort > 0 && currentSprintEffort <= currentSprintCapacity;

  const activeFeature = activeId ? getFeatureById(parseInt(activeId.replace('ticket-', ''))) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="game-board">
        {/* Sidebar */}
        <aside className="game-sidebar">
          <GameInfo
            columns={columns}
            currentSprint={currentSprint}
            capacityModifiers={capacityModifiers}
          />
        </aside>

        {/* Main Board */}
        <main className="board-main">
          <div className="board-header">
            <h2 className="board-title">{scenario.title}</h2>
            <button
              className="retro-button submit-button"
              onClick={() => onSubmitSprint(currentSprint, columns)}
              disabled={!canSubmitSprint}
            >
              {currentSprint === 3 ? 'Submit Final Sprint' : `Complete Sprint ${currentSprint}`}
            </button>
          </div>

          <div className="board-columns">
            <SprintColumn
              id="backlog"
              title="📋 Backlog"
              featureIds={columns.backlog}
              devCapacity={null}
              usedCapacity={getSprintEffort('backlog')}
              isLocked={false}
              isActive={true}
            />

            <SprintColumn
              id="sprint1"
              title="🚀 Sprint 1"
              featureIds={columns.sprint1}
              devCapacity={3 + (capacityModifiers.sprint1 || 0)}
              usedCapacity={getSprintEffort('sprint1')}
              isLocked={lockedSprints.includes(1)}
              isActive={currentSprint === 1}
            />

            <SprintColumn
              id="sprint2"
              title="🚀 Sprint 2"
              featureIds={columns.sprint2}
              devCapacity={3 + (capacityModifiers.sprint2 || 0)}
              usedCapacity={getSprintEffort('sprint2')}
              isLocked={lockedSprints.includes(2)}
              isActive={currentSprint === 2}
            />

            <SprintColumn
              id="sprint3"
              title="🚀 Sprint 3"
              featureIds={columns.sprint3}
              devCapacity={3 + (capacityModifiers.sprint3 || 0)}
              usedCapacity={getSprintEffort('sprint3')}
              isLocked={lockedSprints.includes(3)}
              isActive={currentSprint === 3}
            />
          </div>
        </main>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeFeature ? (
            <div style={{ cursor: 'grabbing' }}>
              <TicketCard feature={activeFeature} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default GameBoard;
