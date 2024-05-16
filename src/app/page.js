// src/app/HomePage.js
"use client";
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to QAA (feur)</h1>
      <p>This project aims to create a platform to facilitate work in the video game industry.</p>
      <p>It is completely open source, and we welcome contributions from developers around the world.</p>
      <a href="https://github.com/antoinerosselli/QAA" target="_blank" rel="noopener noreferrer" className="github-button">
        <img src="/giticon.png" alt="GitHub" />
        View on GitHub
      </a>
    </div>
  );
}

export default HomePage;
