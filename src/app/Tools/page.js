// src/app/Tools/page.js
"use client";

import React from 'react';
import ToolCard from './ToolCard';
import './global.css';

const Tools = () => {
  const toolsData = [
    {
      title: 'HandBrake',
      description: 'Open-source tool for converting and compressing videos.',
      color: '#FF5733',
      url: 'https://handbrake.fr/',
    },
    {
      title: 'Clideo',
      description: 'Online platform to compress videos easily.',
      color: '#33FF57',
      url: 'https://clideo.com/video-compressor',
    },
    {
      title: 'Jira',
      description: 'Popular tool for bug tracking and project management.',
      color: '#3357FF',
      url: 'https://www.atlassian.com/software/jira',
    },
    {
      title: 'Trello',
      description: 'Visual project management tool for tracking tasks and bugs.',
      color: '#FF33A5',
      url: 'https://trello.com/',
    },
    
    // Add more tool data here...
  ];

  return (
    <div className="tools-container">
      {toolsData.map((tool, index) => (
        <ToolCard 
          key={index}
          title={tool.title}
          description={tool.description}
          color={tool.color}
          url={tool.url}
        />
      ))}
    </div>
  );
}

export default Tools;
