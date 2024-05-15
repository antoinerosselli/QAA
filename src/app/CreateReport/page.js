"use client";  // Indique que ce fichier doit être exécuté côté client

import React, { useState, useEffect } from 'react';
import RankTitleLinkInput from './RankTitleLinkInput';  // Assure-toi d'importer correctement le composant
import Modal from './Modal';  // Assure-toi d'importer correctement le composant
import './global.css';  // Import des styles globaux

const CreateReport = () => {
  const [date, setDate] = useState('');
  const [gameName, setGameName] = useState('');
  const [testType, setTestType] = useState('');
  const [gameVersion, setGameVersion] = useState('');
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
    setItems([...items, { rank: '', title: '', link: '' }]);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const reportData = {
      date,
      gameName,
      testType,
      gameVersion,
      testDuration,
      testCompleted,
      additionalInfo,
      items
    };
    setReportData(reportData);
    setShowModal(true);
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
          </select>
        </div>
        <div>
          <label>Version du Jeu:</label>
          <input 
            type="text" 
            value={gameVersion} 
            onChange={(e) => setGameVersion(e.target.value)} 
          />
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
          <input 
            type="text" 
            value={additionalInfo} 
            onChange={(e) => setAdditionalInfo(e.target.value)} 
            placeholder="Optionnel"
          />
        </div>

        <div>
          <h3>Répartition des Types de Rang:</h3>
          <br/>
          <div className="rank-distribution">
            <p>A: {rankCounts.A}</p>
            <p>B: {rankCounts.B}</p>
            <p>C: {rankCounts.C}</p>
            <p>D: {rankCounts.D}</p>
          </div>
        </div>
        <br/>
        
        {items.map((item, index) => (
          <RankTitleLinkInput
            key={index}
            index={index}
            rank={item.rank}
            title={item.title}
            link={item.link}
            setRank={handleRankChange}
            setTitle={handleTitleChange}
            setLink={handleLinkChange}
            handleRemove={handleRemoveItem}
          />
        ))}

        <button type="button" onClick={handleAddItem}>Add</button>
        <button type="submit">Créer le Rapport</button>
      </form>
      <Modal show={showModal} handleClose={() => setShowModal(false)} reportData={reportData} />
    </div>
  );
}

export default CreateReport;
