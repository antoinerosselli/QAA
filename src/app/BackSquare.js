"use client";
import React, { useEffect } from 'react';
import './BackSquare.css';

const BackgroundSquares = () => {
  const squares = Array.from({ length: 20 }, (_, i) => <div key={i} className="square" />);

  useEffect(() => {
    const squareElements = document.querySelectorAll('.square');
    squareElements.forEach(square => {
      const randomAnimation = generateRandomAnimation();
      square.style.animation = `${randomAnimation} 30s linear infinite`;
    });
  }, []);

  const generateRandomAnimation = () => {
    const keyframeName = `move-${Math.random().toString(36).substr(2, 9)}`;
    let keyframes = `@keyframes ${keyframeName} {`;

    for (let i = 0; i <= 100; i += 10) {
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      keyframes += `
        ${i}% {
          transform: translate(${randomX}vw, ${randomY}vh);
        }
      `;
    }

    keyframes += '}';
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    return keyframeName;
  };

  return <div className="background-squares">{squares}</div>;
};

export default BackgroundSquares;
