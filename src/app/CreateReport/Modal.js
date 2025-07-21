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
      case 'A': return '#FF0000';
      case 'B': return '#FFA500';
      case 'C': return '#FFFF00';
      case 'D': return '#808080';
      default: return '#000000';
    }
  };

  const getBackgroundColor = (rank) => {
    switch (rank) {
      case 'A': return '#FFCCCC';
      case 'B': return '#FFE4B5';
      case 'C': return '#FFFFE0';
      case 'D': return '#D3D3D3';
      default: return '#FFFFFF';
    }
  };

  const generateContent = () => {
    const closedBugs = reportData.items.filter(item => item.isClosed && !item.isReopen);
    const reopenBugs = reportData.items.filter(item => item.isReopen && !item.isClosed);
    const otherBugs = reportData.items.filter(item => !item.isClosed && !item.isReopen);

    return `
      <div id="report-content" style="background: white; color: black; padding: 20px; font-family: Arial, sans-serif; line-height: 1.5;">
        <p style="color: #000000;">Rapport Quotidien</p>
        <p style="color: #000000;">${reportData.gameName}[${reportData.gameVersions}] - ${reportData.gameVersionNumber} - ${reportData.date}</p>
        <p>Bonjour,</p>
        <p>Veuillez trouver ci-dessous les détails du rapport :</p>

        <h3>Informations Générales</h3>
        <p><strong>Date :</strong> ${reportData.date}<br/>
        <strong>Nom du Jeu :</strong> ${reportData.gameName}<br/>
        <strong>Ticket du Test :</strong> <a href="${reportData.ticketlink}" target="_blank">${reportData.ticketlink}</a><br/>
        <strong>Type de Test :</strong> ${reportData.testType}<br/>
        <strong>Numéro de Version du Jeu :</strong> ${reportData.gameVersionNumber}<br/>
        <strong>Versions du Jeu :</strong> ${reportData.gameVersions.join(', ')}<br/>
        <strong>Langues Testées :</strong> ${reportData.testedLanguages}<br/>
        <strong>Langues Non Testées :</strong> ${reportData.untestedLanguages}<br/>
        <strong>Temps Passé (heures) :</strong> ${reportData.testDuration}<br/>
        <strong>Crash Randoms :</strong> ${reportData.randomCrashes}<br/>
        <strong>Etat des achievements :</strong> ${reportData.achievementStatus}<br/>
        <strong>Test Terminé :</strong> ${reportData.testCompleted}</p>

        <h3>Configuration du PC</h3>
        <p><strong>Carte Graphique :</strong> ${reportData.pcConfig?.gpu || 'Non spécifiée'}<br/>
        <strong>Processeur :</strong> ${reportData.pcConfig?.cpu || 'Non spécifié'}<br/>
        <strong>RAM :</strong> ${reportData.pcConfig?.ram || 'Non spécifiée'}</p>

        <h3>Résumé des Bugs</h3>
        <p><strong>Bugs Bloquants :</strong> ${reportData.items.filter(item => item.isBlocking).length}<br/>
        <strong>Bugs Causant des Crashs :</strong> ${reportData.items.filter(item => item.isCrash).length}</p>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <p style="border: 2px solid ${getBorderColor("A")}"><strong style="background-color: #FF0000;">A:</strong> ${rankCounts.A}</p>
          <p style="border: 2px solid ${getBorderColor("B")}"><strong style="background-color: #FFA500;">B:</strong> ${rankCounts.B}</p>
          <p style="border: 2px solid ${getBorderColor("C")}"><strong style="background-color: #FFFF00;">C:</strong> ${rankCounts.C}</p>
          <p style="border: 2px solid ${getBorderColor("D")}"><strong style="background-color: #808080;">D:</strong> ${rankCounts.D}</p>
        </div>

        ${otherBugs.length > 0 ? `
          <h3 style="color: #000000;">Bugs :</h3>
          ${otherBugs.map(item => `
            <div style="border: 2px solid ${getBorderColor(item.rank)}; background: ${getBackgroundColor(item.rank)}; padding: 10px; margin-bottom: 10px;">
              <p><strong>Rank :</strong> ${item.rank}</p>
              <p><strong>Titre :</strong> <a href="${item.link}" target="_blank">${item.title}</a></p>
              <p><strong>Crash :</strong> ${item.isCrash ? 'Oui' : 'Non'}</p>
              <p><strong>Bloquant :</strong> ${item.isBlocking ? 'Oui' : 'Non'}</p>
            </div>
          `).join('')}
        ` : ''}

        ${closedBugs.length > 0 ? `
          <h3 style="color: #000000;">Régressions (Closed):</h3>
          ${closedBugs.map(item => `
            <div style="border: 2px solid ${getBorderColor(item.rank)}; background: ${getBackgroundColor(item.rank)}; padding: 10px; margin-bottom: 10px;">
              <p><strong>Rank :</strong> ${item.rank}</p>
              <p><strong>Titre :</strong> <a href="${item.link}" target="_blank">${item.title}</a></p>
              <p><strong>Crash :</strong> ${item.isCrash ? 'Oui' : 'Non'}</p>
              <p><strong>Bloquant :</strong> ${item.isBlocking ? 'Oui' : 'Non'}</p>
            </div>
          `).join('')}
        ` : ''}

        ${reopenBugs.length > 0 ? `
          <h3 style="color: #000000;">Régressions (Re-Open) :</h3>
          ${reopenBugs.map(item => `
            <div style="border: 2px solid ${getBorderColor(item.rank)}; background: ${getBackgroundColor(item.rank)}; padding: 10px; margin-bottom: 10px;">
              <p><strong>Rank :</strong> ${item.rank}</p>
              <p><strong>Titre :</strong> <a href="${item.link}" target="_blank">${item.title}</a></p>
              <p><strong>Crash :</strong> ${item.isCrash ? 'Oui' : 'Non'}</p>
              <p><strong>Bloquant :</strong> ${item.isBlocking ? 'Oui' : 'Non'}</p>
            </div>
          `).join('')}
        ` : ''}

        <h3>Informations Complémentaires</h3>
        <p>${reportData.additionalInfo}</p>

        <p>Cordialement,</p>
      </div>
    `;
  };

  const handleCopy = () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = generateContent();
    document.body.appendChild(tempElement);

    const content = tempElement.querySelector('#report-content');
    const range = document.createRange();
    range.selectNode(content);
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
};

export default Modal;
