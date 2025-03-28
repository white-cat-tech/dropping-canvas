import React from 'react';
import '../styles/Event.css';

const Event = ({ event, onDragStart, activities }) => {
  const handleDragStart = (e) => {
    // Prevent default behavior to enable custom drag handling
    e.preventDefault();

    // Call the parent component's drag handler
    onDragStart(e, event, 'event');
  };

  // Find the connected activity if any
  const connectedActivity = activities.find(activity => activity.id === event.connectedTo);

  // Calculate connection line coordinates if connected to an activity
  const getConnectionLine = () => {
    if (!connectedActivity) return null;

    // Event center coordinates
    const eventCenterX = event.x + event.width / 2;
    const eventCenterY = event.y + event.height / 2;

    // Activity connection point coordinates
    let activityPointX, activityPointY;

    if (event.connectionPoint === 'head') {
      activityPointX = connectedActivity.x + connectedActivity.width;
      activityPointY = connectedActivity.y + connectedActivity.height / 2;
    } else { // butt
      activityPointX = connectedActivity.x;
      activityPointY = connectedActivity.y + connectedActivity.height / 2;
    }

    return {
      x1: eventCenterX,
      y1: eventCenterY,
      x2: activityPointX,
      y2: activityPointY
    };
  };

  const connectionLine = getConnectionLine();

  return (
    <>
      {/* Connection line */}
      {connectionLine && (
        <svg
          className="connection-line"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          <line
            x1={connectionLine.x1}
            y1={connectionLine.y1}
            x2={connectionLine.x2}
            y2={connectionLine.y2}
            stroke="#333"
            strokeWidth="2"
          />
        </svg>
      )}

      {/* Event element */}
      <div
        className="event"
        style={{
          left: event.x,
          top: event.y,
          width: event.width,
          height: event.height,
          cursor: 'move'
        }}
        onMouseDown={handleDragStart}
        draggable="true"
      />
    </>
  );
};

export default Event;