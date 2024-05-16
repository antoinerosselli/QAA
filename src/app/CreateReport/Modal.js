// src/app/CreateReport/Modal.js
import React, { useRef } from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, reportData }) => {
  const contentRef = useRef(null);

  if (!show) {
    return null;
  }

  const handleCopy = () => {
    const content = `
      Bonjour,

      Veuillez trouver ci-dessous les détails du rapport :

      Date : ${reportData.date}
      Nom du Jeu : ${reportData.gameName}
      Type de Test : ${reportData.testType}
      Version du Jeu : ${reportData.gameVersion}
      Temps Passé (heures) : ${reportData.testDuration}
      
      Bugs :
      ${reportData.items.map((item, index) => `
        Bug ${index + 1} :
        Rank : ${item.rank}
        Titre : ${item.title}
        Lien : ${item.link}
        `).join('\n')}

      Informations Complémentaires : ${reportData.additionalInfo}
      Test Terminé : ${reportData.testCompleted}

      Cordialement,
    `;

    navigator.clipboard.writeText(content).then(() => {
      alert('Le contenu a été copié dans le presse-papiers.');
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal" ref={contentRef}>
        <h2>Preview du Rapport</h2>
        <p>Bonjour,</p>
        <p>Veuillez trouver ci-dessous les détails du rapport :</p>
        <p>Date : {reportData.date}</p>
        <p>Nom du Jeu : {reportData.gameName}</p>
        <p>Type de Test : {reportData.testType}</p>
        <p>Version du Jeu : {reportData.gameVersion}</p>
        <p>Temps Passé (heures) : {reportData.testDuration}</p>
        <p>Test Terminé : {reportData.testCompleted}</p>
        <p>Informations Complémentaires : {reportData.additionalInfo}</p>
        <h3>Bugs :</h3>
        {reportData.items.map((item, index) => (
          <div key={index}>
            <p>Bug {index + 1} :</p>
            <p>Rank : {item.rank}</p>
            <p>Titre : {item.title}</p>
            <p>Lien : {item.link}</p>
            <hr />
          </div>
        ))}
        <p>Cordialement,</p>
        <div className="modal-buttons">
          <button onClick={handleClose}>Fermer</button>
          <button onClick={handleCopy}>Copier</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
