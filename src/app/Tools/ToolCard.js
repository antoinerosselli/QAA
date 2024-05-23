import React from 'react';
import './ToolCard.css';

const ToolCard = ({ title, description, link }) => {
  const handleCardClick = () => {
    window.open(link, '_blank');
  };

  return (
    <div className="tool-card" onClick={handleCardClick}>
      <div className="tool-card-title">{title}</div>
      <div className="tool-card-description">{description}</div>
    </div>
  );
};

export default ToolCard;
