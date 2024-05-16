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

  const handleCopy = () => {
    const content = `
      <div style="background: white; color: black; padding: 20px;">
        <p>Bonjour,</p>
        <p>Veuillez trouver ci-dessous les détails du rapport :</p>
        </br>
        <p><strong>Date :</strong> ${reportData.date}</p>
        <p><strong>Nom du Jeu :</strong> ${reportData.gameName}</p>
        <p><strong>Type de Test :</strong> ${reportData.testType}</p>
        <p><strong>Versions du Jeu :</strong> ${reportData.gameVersions.join(', ')}</p>
        <p><strong>Temps Passé (heures) :</strong> ${reportData.testDuration}</p>
        <p><strong>Test Terminé :</strong> ${reportData.testCompleted}</p>
        <br/>
        <p><strong>Bugs :</strong></p>
        </br>
        <p><strong>Résumé :</strong></p>
        <p><strong>Bugs Bloquants :</strong> ${reportData.items.filter(item => item.isBlocking).length}</p>
        <p><strong>Bugs Causant des Crashs :</strong> ${reportData.items.filter(item => item.isCrash).length}</p>
        </br>
        <div style="display: flex; gap: 10px;">
          <p><strong style="background-color: red;">A:</strong> ${rankCounts.A}</p>
          <p><strong style="background-color: orange;">B:</strong> ${rankCounts.B}</p>
          <p><strong style="background-color: yellow;">C:</strong> ${rankCounts.C}</p>
          <p><strong style="background-color: gray;">D:</strong> ${rankCounts.D}</p>
        </div>
        </br>
        ${reportData.items.map((item, index) => `
          <div style="border: 2px solid ${getBorderColor(item.rank)}; background: ${getBackgroundColor(item.rank)}; padding: 10px; margin-bottom: 10px;">
            <p><strong>Bug ${index + 1} :</strong></p>
            <p><strong>Rank :</strong> ${item.rank}</p>
            <p><strong>Titre :</strong> ${item.title}</p>
            <p><strong>Lien :</strong> ${item.link}</p>
            <p><strong>Crash :</strong> ${item.isCrash ? 'Oui' : 'Non'}</p>
            <p><strong>Bloquant :</strong> ${item.isBlocking ? 'Oui' : 'Non'}</p>
          </div>
        `).join('')}
        </br>
        <p><strong>Informations Complémentaires :</strong> ${reportData.additionalInfo}</p>
        </br>
        <p>Cordialement,</p>
      </div>
    `;

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

  return (
    <div className="modal-overlay">
      <div className="modal" ref={contentRef}>
        <div className="modal-content">
          <h2>Preview du Rapport</h2>
          <p><strong>Bonjour,</strong></p>
          <p><strong>Veuillez trouver ci-dessous les détails du rapport :</strong></p>
          <br/>
          <p><strong>Date :</strong> {reportData.date}</p>
          <p><strong>Nom du Jeu :</strong> {reportData.gameName}</p>
          <p><strong>Type de Test :</strong> {reportData.testType}</p>
          <p><strong>Versions du Jeu :</strong> {reportData.gameVersions.join(', ')}</p>
          <p><strong>Temps Passé (heures) :</strong> {reportData.testDuration}</p>
          <p><strong>Test Terminé :</strong> {reportData.testCompleted}</p>
          <br/>
          <p><strong>Résumé des Bugs : </strong></p>
          <p><strong>Bugs Bloquants :</strong> {reportData.items.filter(item => item.isBlocking).length}</p>
          <p><strong>Bugs Causant des Crashs :</strong> {reportData.items.filter(item => item.isCrash).length}</p>
          <br/>
          <p><strong>Détails des Bugs : </strong></p>
          <br/>
          <div className="rank-distribution">
            <p><strong style={{ backgroundColor: 'red' }}>A:</strong> {rankCounts.A}</p>
            <p><strong style={{ backgroundColor: 'orange' }}>B:</strong> {rankCounts.B}</p>
            <p><strong style={{ backgroundColor: 'yellow' }}>C:</strong> {rankCounts.C}</p>
            <p><strong style={{ backgroundColor: 'gray' }}>D:</strong> {rankCounts.D}</p>
          </div>
          <br/>
          {reportData.items.map((item, index) => (
            <div key={index} style={{ border: `2px solid ${getBorderColor(item.rank)}`, background: getBackgroundColor(item.rank), padding: '10px', marginBottom: '10px' }}>
              <p><strong>Bug {index + 1} :</strong></p>
              <p><strong>Rank :</strong> {item.rank}</p>
              <p><strong>Titre :</strong> {item.title}</p>
              <p><strong>Lien :</strong> {item.link}</p>
              <p><strong>Crash :</strong> {item.isCrash ? 'Oui' : 'Non'}</p>
              <p><strong>Bloquant :</strong> {item.isBlocking ? 'Oui' : 'Non'}</p>
            </div>
          ))}
          <br/>
          <p><strong>Informations Complémentaires :</strong> {reportData.additionalInfo}</p>
          <br/>
          <p><strong>Cordialement,</strong></p>
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