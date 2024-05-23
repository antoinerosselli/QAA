// src/app/CreateReport/Modal.js
import React, { useRef, useEffect } from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, reportData }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (show && contentRef.current) {
      contentRef.current.innerHTML = generateSimpleContent();
    }
  }, [show]);

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

  const generateSimpleContent = () => {
    return `
      <table style="width: 100%; background: white; color: black; padding: 20px; font-family: Arial, sans-serif; line-height: 1.5;">
        <tr>
          <td colspan="2"><h1 style="color: #5865F2;">Rapport Quotidien</h1></td>
        </tr>
        <tr>
          <td colspan="2"><h2 style="color: #5865F2;">${reportData.gameName}[${reportData.gameVersions}] - ${reportData.gameVersionNumber} - ${reportData.date}</h2></td>
        </tr>
        <tr>
          <td colspan="2"><p>Bonjour,</p></td>
        </tr>
        <tr>
          <td colspan="2"><p>Veuillez trouver ci-dessous les détails du rapport :</p></td>
        </tr>
        <tr>
          <td colspan="2"><br/></td>
        </tr>
        <tr>
          <td colspan="2"><h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Informations Générales</h3></td>
        </tr>
        <tr>
          <td><strong>Date :</strong></td>
          <td>${reportData.date}</td>
        </tr>
        <tr>
          <td><strong>Nom du Jeu :</strong></td>
          <td>${reportData.gameName}</td>
        </tr>
        <tr>
          <td><strong>Type de Test :</strong></td>
          <td>${reportData.testType}</td>
        </tr>
        <tr>
          <td><strong>Numéro de Version du Jeu :</strong></td>
          <td>${reportData.gameVersionNumber}</td>
        </tr>
        <tr>
          <td><strong>Versions du Jeu :</strong></td>
          <td>${reportData.gameVersions.join(', ')}</td>
        </tr>
        <tr>
          <td><strong>Langues Testées :</strong></td>
          <td>${reportData.testedLanguages}</td>
        </tr>
        <tr>
          <td><strong>Langues Non Testées :</strong></td>
          <td>${reportData.untestedLanguages}</td>
        </tr>
        <tr>
          <td><strong>Temps Passé (heures) :</strong></td>
          <td>${reportData.testDuration}</td>
        </tr>
        <tr>
          <td><strong>Test Terminé :</strong></td>
          <td>${reportData.testCompleted}</td>
        </tr>
        <tr>
          <td colspan="2"><br/></td>
        </tr>
        <tr>
          <td colspan="2"><h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Résumé des Bugs</h3></td>
        </tr>
        <tr>
          <td><strong>Bugs Bloquants :</strong></td>
          <td>${reportData.items.filter(item => item.isBlocking).length}</td>
        </tr>
        <tr>
          <td><strong>Bugs Causant des Crashs :</strong></td>
          <td>${reportData.items.filter(item => item.isCrash).length}</td>
        </tr>
        <tr>
          <td colspan="2"><br/></td>
        </tr>
        <tr>
          <td colspan="2"><h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Détails des Bugs</h3></td>
        </tr>
        ${reportData.items.map((item, index) => `
          <tr>
            <td colspan="2" style="border: 2px solid ${getBorderColor(item.rank)}; background: ${getBackgroundColor(item.rank)}; padding: 10px; margin-bottom: 10px;">
              <p><strong>Bug ${index + 1} :</strong></p>
              <p><strong>Rank :</strong> ${item.rank}</p>
              <p><strong>Titre :</strong> <a href="${item.link}" target="_blank" style="color: #5865F2;">${item.title}</a></p>
              <p><strong>Crash :</strong> ${item.isCrash ? 'Oui' : 'Non'}</p>
              <p><strong>Bloquant :</strong> ${item.isBlocking ? 'Oui' : 'Non'}</p>
            </td>
          </tr>
        `).join('')}
        ${reportData.levels && reportData.levels.length > 0 ? `
          <tr>
            <td colspan="2"><h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Niveaux Testés</h3></td>
          </tr>
          ${reportData.levels.map((level, index) => `
            <tr>
              <td colspan="2" style="padding: 10px; margin-bottom: 10px; border: 1px solid #ddd;">
                <p><strong>Niveau ${index + 1} :</strong> ${level.levelName}</p>
                <p><strong>Avis :</strong> ${level.levelReview}</p>
                <p><strong>Bugs associés :</strong> ${level.selectedBugs.map(bugIndex => reportData.items[bugIndex].title).join(', ')}</p>
              </td>
            </tr>
          `).join('')}
        ` : ''}
        <tr>
          <td colspan="2"><br/></td>
        </tr>
        <tr>
          <td colspan="2"><h3 style="color: #000000; text-decoration: underline; font-size: 1.2em;">Informations Complémentaires</h3></td>
        </tr>
        <tr>
          <td colspan="2">${reportData.additionalInfo}</td>
        </tr>
        <tr>
          <td colspan="2"><br/></td>
        </tr>
        <tr>
          <td colspan="2"><p>Cordialement,</p></td>
        </tr>
      </table>
    `;
  };

  const handleCopy = () => {
    const content = generateSimpleContent();

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
          <div dangerouslySetInnerHTML={{ __html: generateSimpleContent() }} />
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
