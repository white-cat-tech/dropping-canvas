import React from 'react';
import '../styles/Toolbar.css';

const Toolbar = () => {
  const handleDragStart = (e, type) => {
    // Set the drag data with the element type
    e.dataTransfer.setData('application/reactflow', type);
    e.dataTransfer.effectAllowed = 'move';

    // Create a custom drag image based on the element type
    const dragImage = document.createElement('div');
    dragImage.className = `drag-preview ${type}`;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 15, 15);

    // Remove the drag image after it's no longer needed
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  return (
    <div className="toolbar">
      <h3>Element Library</h3>
      <div className="toolbar-section">
        <h4>Activities</h4>
        <div
          className="toolbar-item activity-item"
          draggable
          onDragStart={(e) => handleDragStart(e, 'activity')}
        >
          <div className="activity-preview horizontal" />
          <span>Activity</span>
        </div>
      </div>

      <div className="toolbar-section">
        <h4>Events</h4>
        <div
          className="toolbar-item event-item"
          draggable
          onDragStart={(e) => handleDragStart(e, 'event')}
        >
          <div className="event-preview" />
          <span>Event</span>
        </div>
      </div>

      <div className="toolbar-info">
        <p><strong>Rules:</strong></p>
        <ul>
          <li>Activities must be placed on borders between cells</li>
          <li>Events must connect to an activity's head or butt</li>
          <li>Activities can span adjacent or non-adjacent cells</li>
        </ul>
      </div>
    </div>
  );
};

export default Toolbar;