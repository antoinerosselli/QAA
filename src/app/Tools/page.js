"use client";
import React from 'react';
import ToolCard from './ToolCard';
import './Tool.css';
import '../global.css';
import './ToolCard.css'; // Assurez-vous d'inclure ce fichier CSS

const Tools = () => {
  const toolsData = [
    {
      title: 'FreeConvert',
      description: 'Tool for converting and compressing videos.',
      link: 'https://www.freeconvert.com/video-compressor',
    },
    {
      title: 'Clipchamp',
      description: 'Tool for edit videos.',
      link: 'https://clipchamp.com/fr/video-editor/',
    },
  ];

  return (
    <div className="tools-container">
      {toolsData.map((tool, index) => (
        <ToolCard 
          key={index}
          title={tool.title}
          description={tool.description}
          link={tool.link}
        />
      ))}
    </div>
  );
}

export default Tools;
