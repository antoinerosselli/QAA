// src/app/CreateReport/Modal.js
import React, { useRef } from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, reportData }) => {
  const contentRef = useRef(null);

  if (!show) {
    return null;
  }

  const countRanks = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    reportData.items.forEach(item => {
      if (counts[item.rank] !== undefined) {
        counts[item.rank]++;
      }
    });
    return counts;
  };

  const rankCounts = countRanks();

  const getBorderColor = (rank) => {
    switch (rank) {
      case 'A': return 'red';
      case 'B': return 'orange';
      case 'C': return 'yellow';
      case 'D': return 'gray';
      default: return 'black';
    }
  };

  const getBackgroundColor = (rank) => {
    switch (rank) {
      case 'A': return 'rgba(255, 0, 0, 0.1)'; // Light red
      case 'B': return 'rgba(255, 165, 0, 0.1)'; // Light orange
      case 'C': return 'rgba(255, 255, 0, 0.1)'; // Light yellow
      case 'D': return 'rgba(128, 128, 128, 0.1)'; // Light gray
      default: return 'white';
    }
  };

  const generateContent = () => {
    return `
      <div style="background: white; color: black; padding: 20px;">
        <p style="color: black;">Bonjour,</p>
        <p style="color: black;">Veuillez trouver ci-dessous les détails du rapport :</p>
        <p style="color: black;"><strong>Date :</strong> ${reportData.date}</p>
        <p style="color: black;"><strong>Nom du Jeu :</strong> ${reportData.gameName}</p>
        <p style="color: black;"><strong>Type de Test :</strong> ${reportData.testType}</p>
        <p style="color: black;"><strong>Numéro de Version du Jeu :</strong> ${reportData.gameVersionNumber}</p>
        <p style="color: black;"><strong>Versions du Jeu :</strong> ${reportData.gameVersions.join(', ')}</p>
        <p style="color: black;"><strong>Temps Passé (heures) :</strong> ${reportData.testDuration}</p>
        <p style="color: black;"><strong>Test Terminé :</strong> ${reportData.testCompleted}</p>
        <br/>
        <p style="color: black;"><strong>Bugs :</strong></p>
        <br/>
        <p style="color: black;"><strong>Résumé :</strong></p>
        <p style="color: black;"><strong>Bugs Bloquants :</strong> ${reportData.items.filter(item => item.isBlocking).length}</p>
        <p style="color: black;"><strong>Bugs Causant des Crashs :</strong> ${reportData.items.filter(item => item.isCrash).length}</p>
        <br/>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <p style="color: black;"><strong style="background-color: red;">A:</strong> ${rankCounts.A}</p>
          <p style="color: black;"><strong style="background-color: orange;">B:</strong> ${rankCounts.B}</p>
          <p style="color: black;"><strong style="background-color: yellow;">C:</strong> ${rankCounts.C}</p>
          <p style="color: black;"><strong style="background-color: gray;">D:</strong> ${rankCounts.D}</p>
        </div>
        <br/>
        ${reportData.items.map((item, index) => `
          <div style="border: 2px solid ${getBorderColor(item.rank)}; background: ${getBackgroundColor(item.rank)}; padding: 10px; margin-bottom: 10px; display: inline-block; width: calc(50% - 10px); box-sizing: border-box;">
            <p style="color: black;"><strong>Bug ${index + 1} :</strong></p>
            <p style="color: black;"><strong>Rank :</strong> ${item.rank}</p>
            <p style="color: black;"><strong>Titre :</strong> ${item.title}</p>
            <p style="color: black;"><strong>Lien :</strong> ${item.link}</p>
            <p style="color: black;"><strong>Crash :</strong> ${item.isCrash ? 'Oui' : 'Non'}</p>
            <p style="color: black;"><strong>Bloquant :</strong> ${item.isBlocking ? 'Oui' : 'Non'}</p>
          </div>
        `).join('')}
        <br/>
        <p style="color: black;"><strong>Informations Complémentaires :</strong> ${reportData.additionalInfo}</p>
        <br/>
        <p style="color: black;">Cordialement,</p>
      </div>
    `;
  };

  const handleCopy = () => {
    const content = generateContent();

    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    document.body.appendChild(tempElement);

    const range = document.createRange();
    range.selectNode(tempElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.body.removeChild(tempElement);

    alert('Le contenu a été copié dans le presse-papiers.');
  };

  return (
    <div className="modal-overlay">
      <div className="modal" ref={contentRef}>
        <div className="modal-content">
          <h2>Preview du Rapport</h2>
          <div dangerouslySetInnerHTML={{ __html: generateContent() }} />
          <div className="modal-buttons">
            <button onClick={handleClose}>Fermer</button>
            <button onClick={handleCopy}>Copier</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
