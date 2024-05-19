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
      case 'A': return '#FF0000'; // Red
      case 'B': return '#FFA500'; // Orange
      case 'C': return '#FFFF00'; // Yellow
      case 'D': return '#808080'; // Gray
      default: return '#000000'; // Black
    }
  };

  const getBackgroundColor = (rank) => {
    switch (rank) {
      case 'A': return '#FFCCCC'; // Light red
      case 'B': return '#FFE4B5'; // Light orange
      case 'C': return '#FFFFE0'; // Light yellow
      case 'D': return '#D3D3D3'; // Light gray
      default: return '#FFFFFF'; // White
    }
  };

  const generateContent = () => {
    return `
      <div style="background: white; color: black; padding: 20px; font-family: Arial, sans-serif; line-height: 1.5;">
        <h1 style="color: #5865F2;">Rapport Quotidien</h1>
        <h2 style="color: #5865F2;">${reportData.gameName}[${reportData.gameVersions}] - ${reportData.gameVersionNumber} - ${reportData.date}</h2>
        <p>Bonjour,</p>
        <p>Veuillez trouver ci-dessous les détails du rapport :</p>
        <br/>
        <h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Informations Générales</h3>
        <p><strong>Date :</strong> ${reportData.date}</p>
        <p><strong>Nom du Jeu :</strong> ${reportData.gameName}</p>
        <p><strong>Type de Test :</strong> ${reportData.testType}</p>
        <p><strong>Numéro de Version du Jeu :</strong> ${reportData.gameVersionNumber}</p>
        <p><strong>Versions du Jeu :</strong> ${reportData.gameVersions.join(', ')}</p>
        <p><strong>Langues Testées :</strong> ${reportData.testedLanguages}</p>
        <p><strong>Langues Non Testées :</strong> ${reportData.untestedLanguages}</p>
        <p><strong>Temps Passé (heures) :</strong> ${reportData.testDuration}</p>
        <p><strong>Test Terminé :</strong> ${reportData.testCompleted}</p>
        <br/>
        <h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Résumé des Bugs</h3>
        <p><strong>Bugs Bloquants :</strong> ${reportData.items.filter(item => item.isBlocking).length}</p>
        <p><strong>Bugs Causant des Crashs :</strong> ${reportData.items.filter(item => item.isCrash).length}</p>
        <br/>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <p><strong style="background-color: #FF0000; color: white; padding: 5px;">A:</strong> ${rankCounts.A}</p>
          <p><strong style="background-color: #FFA500; color: white; padding: 5px;">B:</strong> ${rankCounts.B}</p>
          <p><strong style="background-color: #FFFF00; color: black; padding: 5px;">C:</strong> ${rankCounts.C}</p>
          <p><strong style="background-color: #808080; color: white; padding: 5px;">D:</strong> ${rankCounts.D}</p>
        </div>
        <br/>
        <h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Détails des Bugs</h3>
        <br/>
        ${reportData.items.map((item, index) => `
          <div style="border: 2px solid ${getBorderColor(item.rank)}; background: ${getBackgroundColor(item.rank)}; padding: 10px; margin-bottom: 10px;">
            <p><strong>Bug ${index + 1} :</strong></p>
            <p><strong>Rank :</strong> ${item.rank}</p>
            <p><strong>Titre :</strong> <a href="${item.link}" target="_blank" style="color: #5865F2;">${item.title}</a></p>
            <p><strong>Crash :</strong> ${item.isCrash ? 'Oui' : 'Non'}</p>
            <p><strong>Bloquant :</strong> ${item.isBlocking ? 'Oui' : 'Non'}</p>
          </div>
        `).join('')}

        ${reportData.levels && reportData.levels.length > 0 ? `
          <h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Niveaux Testés</h3>
          <br/>
          ${reportData.levels.map((level, index) => `
            <div style="padding: 10px; margin-bottom: 10px; border: 1px solid #ddd;">
              <p><strong>Niveau ${index + 1} :</strong> ${level.levelName}</p>
              <p><strong>Avis :</strong> ${level.levelReview}</p>
              <p><strong>Bugs associés :</strong> ${level.selectedBugs.map(bugIndex => reportData.items[bugIndex].title).join(', ')}</p>
            </div>
          `).join('')}
        ` : ''}
        <br/>
        <h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Informations Complémentaires</h3>
        <p>${reportData.additionalInfo}</p>
        <br/>
        <p>Cordialement,</p>
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
