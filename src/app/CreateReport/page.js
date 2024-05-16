// src/app/CreateReport/page.js
"use client";  // Indique que ce fichier doit être exécuté côté client

import React, { useState, useEffect } from 'react';
import RankTitleLinkInput from './RankTitleLinkInput';  // Assure-toi d'importer correctement le composant
import Modal from './Modal';  // Assure-toi d'importer correctement le composant
import './global.css';  // Import des styles globaux

const CreateReport = () => {
  const [date, setDate] = useState('');
  const [gameName, setGameName] = useState('');
  const [testType, setTestType] = useState('');
  const [gameVersions, setGameVersions] = useState([]);
  const [testDuration, setTestDuration] = useState('');
  const [testCompleted, setTestCompleted] = useState(''); // Pour indiquer si le test est terminé
  const [additionalInfo, setAdditionalInfo] = useState(''); // Pour des informations complémentaires
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);  // État pour contrôler la visibilité de la modal
  const [reportData, setReportData] = useState({});  // État pour stocker les données du rapport

  useEffect(() => {
    const today = new Date().toISOString().substr(0, 10);
    setDate(today);
  }, []);

  const handleAddItem = () => {
    setItems([...items, { rank: '', title: '', link: '', isCrash: false, isBlocking: false }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleRankChange = (index, value) => {
    const newItems = [...items];
    newItems[index].rank = value;
    setItems(newItems);
  };

  const handleTitleChange = (index, value) => {
    const newItems = [...items];
    newItems[index].title = value;
    setItems(newItems);
  };

  const handleLinkChange = (index, value) => {
    const newItems = [...items];
    newItems[index].link = value;
    setItems(newItems);
  };

  const handleCrashChange = (index, value) => {
    const newItems = [...items];
    newItems[index].isCrash = value;
    setItems(newItems);
  };

  const handleBlockingChange = (index, value) => {
    const newItems = [...items];
    newItems[index].isBlocking = value;
    setItems(newItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reportData = {
      date,
      gameName,
      testType,
      gameVersions,
      testDuration,
      testCompleted,
      additionalInfo,
      items
    };
    setReportData(reportData);
    setShowModal(true);
  };

  const handleGameVersionsChange = (e) => {
    const options = e.target.options;
    const selectedVersions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedVersions.push(options[i].value);
      }
    }
    setGameVersions(selectedVersions);
  };

  const countRanks = () => {
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    items.forEach(item => {
      if (counts[item.rank] !== undefined) {
        counts[item.rank]++;
      }
    });
    return counts;
  };

  const rankCounts = countRanks();

  return (
    <div className="container">
      <h1>Create a Report</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>
        <div>
          <label>Nom du Jeu:</label>
          <input 
            type="text" 
            value={gameName} 
            onChange={(e) => setGameName(e.target.value)} 
          />
        </div>
        <div>
          <label>Type de Test:</label>
          <select value={testType} onChange={(e) => setTestType(e.target.value)}>
            <option value="">Sélectionner un type de test</option>
            <option value="Regression">Regression</option>
            <option value="Sanity">Sanity</option>
            <option value="Smoke">Smoke</option>
            <option value="Functionality">Functionality</option>
          </select>
        </div>
        <div>
          <label>Version du Jeu:</label>
          <select multiple value={gameVersions} onChange={handleGameVersionsChange}>
            <option value="PS4">PS4</option>
            <option value="PS5">PS5</option>
            <option value="XBOX SERIES">XBOX SERIES</option>
            <option value="XBOX ONE">XBOX ONE</option>
            <option value="STEAM">STEAM</option>
            <option value="GOG">GOG</option>
            <option value="EPIC">EPIC</option>
            <option value="SWITCH">SWITCH</option>
          </select>
        </div>
        <div>
          <label>Temps Passé (heures):</label>
          <input 
            type="number" 
            value={testDuration} 
            onChange={(e) => setTestDuration(e.target.value)} 
          />
        </div>
        <div>
          <label>Test Terminé:</label>
          <select value={testCompleted} onChange={(e) => setTestCompleted(e.target.value)}>
            <option value="">Sélectionner une option</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
        </div>
        <div>
          <label>Informations Complémentaires:</label>
          <textarea 
            value={additionalInfo} 
            onChange={(e) => setAdditionalInfo(e.target.value)} 
            placeholder="Optionnel"
            rows="4"
            style={{ width: '100%', color: 'black' }}
          ></textarea>
        </div>
        <br/>
        <div>
          <div className="rank-distribution">
            <p><strong style={{ backgroundColor: 'red' }}>A:</strong> {rankCounts.A}</p>
            <p><strong style={{ backgroundColor: 'orange' }}>B:</strong> {rankCounts.B}</p>
            <p><strong style={{ backgroundColor: 'yellow' }}>C:</strong> {rankCounts.C}</p>
            <p><strong style={{ backgroundColor: 'gray' }}>D:</strong> {rankCounts.D}</p>
          </div>
        </div>
        <br/>
        <br/>
        {items.map((item, index) => (
          <RankTitleLinkInput
            key={index}
            index={index}
            rank={item.rank}
            title={item.title}
            link={item.link}
            isCrash={item.isCrash}
            isBlocking={item.isBlocking}
            setRank={handleRankChange}
            setTitle={handleTitleChange}
            setLink={handleLinkChange}
            setIsCrash={handleCrashChange}
            setIsBlocking={handleBlockingChange}
            handleRemove={handleRemoveItem}
          />
        ))}

        <button type="button" onClick={handleAddItem}>Ajouter un bug</button>
        <button type="submit">Créer le Rapport</button>
      </form>
      <Modal show={showModal} handleClose={() => setShowModal(false)} reportData={reportData} />
    </div>
  );
}

export default CreateReport;
