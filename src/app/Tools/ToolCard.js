// src/app/Tools/ToolCard.js
import React from 'react';
import './ToolCard.css';

const ToolCard = ({ title, description, color, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="tool-card-link">
      <div className="tool-card" style={{ backgroundColor: color }}>
        <h3 className="tool-card-title">{title}</h3>
        <p className="tool-card-description">{description}</p>
      </div>
    </a>
  );
}

export default ToolCard;
