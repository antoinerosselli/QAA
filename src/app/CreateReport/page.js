// src/app/CreateReport/page.js
"use client";

import React, { useState, useEffect } from 'react';
import RankTitleLinkInput from './RankTitleLinkInput';
import LevelTestedInput from './LevelTestedInput';
import Modal from './Modal';
import './global.css';

const CreateReport = () => {
  const [date, setDate] = useState('');
  const [gameName, setGameName] = useState('');
  const [testType, setTestType] = useState('');
  const [gameVersionNumber, setGameVersionNumber] = useState('');
  const [gameVersions, setGameVersions] = useState([]);
  const [testDuration, setTestDuration] = useState('');
  const [testCompleted, setTestCompleted] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [testedLanguages, setTestedLanguages] = useState('');
  const [untestedLanguages, setUntestedLanguages] = useState('');
  const [items, setItems] = useState([]);
  const [levels, setLevels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reportData, setReportData] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().substr(0, 10);
    setDate(today);
  }, []);

  const handleAddItem = () => {
    setItems([...items, { rank: '', title: '', link: '', isCrash: false, isBlocking: false }]);
  };

  const handleAddLevel = () => {
    setLevels([...levels, { levelName: '', levelReview: '', selectedBugs: [] }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleRemoveLevel = (index) => {
    const newLevels = levels.filter((_, i) => i !== index);
    setLevels(newLevels);
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

  const handleLevelNameChange = (index, value) => {
    const newLevels = [...levels];
    newLevels[index].levelName = value;
    setLevels(newLevels);
  };

  const handleLevelReviewChange = (index, value) => {
    const newLevels = [...levels];
    newLevels[index].levelReview = value;
    setLevels(newLevels);
  };

  const handleSelectedBugsChange = (index, selectedValues) => {
    const newLevels = [...levels];
    newLevels[index].selectedBugs = selectedValues;
    setLevels(newLevels);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reportData = {
      date,
      gameName,
      testType,
      gameVersionNumber,
      gameVersions,
      testedLanguages,
      untestedLanguages,
      testDuration,
      testCompleted,
      additionalInfo,
      items,
      levels // Ajout des niveaux au rapport
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
          <label>Numéro de Version du Jeu:</label>
          <input 
            type="text" 
            value={gameVersionNumber} 
            onChange={(e) => setGameVersionNumber(e.target.value)} 
          />
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
          <label>Langues Testées:</label>
          <input 
            type="text" 
            value={testedLanguages} 
            onChange={(e) => setTestedLanguages(e.target.value)} 
            placeholder="Séparer par des virgules"
            style={{ color: 'white' }}
          />
        </div>
        <div>
          <label>Langues Non Testées:</label>
          <input 
            type="text" 
            value={untestedLanguages} 
            onChange={(e) => setUntestedLanguages(e.target.value)} 
            placeholder="Séparer par des virgules"
            style={{ color: 'white' }}
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
        {levels.map((level, index) => (
          <LevelTestedInput
            key={index}
            index={index}
            levelName={level.levelName}
            levelReview={level.levelReview}
            selectedBugs={level.selectedBugs}
            setLevelName={handleLevelNameChange}
            setLevelReview={handleLevelReviewChange}
            setSelectedBugs={handleSelectedBugsChange}
            bugs={items}
            handleRemove={handleRemoveLevel}
          />
        ))}

        <button type="button" onClick={handleAddItem}>Ajouter un bug</button>
        <button type="button" onClick={handleAddLevel}>Ajouter un niveau testé</button>
        <br/>
        <br/>
        <button type="submit">Créer le Rapport</button>
      </form>
      <Modal show={showModal} handleClose={() => setShowModal(false)} reportData={reportData} />
    </div>
  );
}

export default CreateReport;
