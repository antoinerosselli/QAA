"use client";

import React, { useState, useEffect } from 'react';
import RankTitleLinkInput from './RankTitleLinkInput';
import PcConfigInput from './ConfigPc';
import Modal from './Modal';
import '../global.css';

const CreateReport = () => {
  const [date, setDate] = useState('');
  const [gameName, setGameName] = useState('');
  const [ticketlink, setTicketLink] = useState('');
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
  const [achievementStatus, setAchievementStatus] = useState(''); 
  const [randomCrashes, setRandomCrashes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [reportData, setReportData] = useState({});
  const [pcConfig, setPcConfig] = useState({ gpu: '', cpu: '', ram: '' });
  const [showPcConfig, setShowPcConfig] = useState(false);

  useEffect(() => {
    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    const storedData = JSON.parse(localStorage.getItem('reportData'));
    if (storedData && storedData.date === formattedToday) {
      setDate(storedData.date || '');
      setGameName(storedData.gameName || '');
      setTicketLink(storedData.ticketlink || '');
      setTestType(storedData.testType || '');
      setGameVersionNumber(storedData.gameVersionNumber || '');
      setGameVersions(storedData.gameVersions || []);
      setTestDuration(storedData.testDuration || '');
      setTestCompleted(storedData.testCompleted || '');
      setAdditionalInfo(storedData.additionalInfo || '');
      setTestedLanguages(storedData.testedLanguages || '');
      setUntestedLanguages(storedData.untestedLanguages || '');
      setItems(storedData.items || []);
      setLevels(storedData.levels || []);
      setAchievementStatus(storedData.achievementStatus || ''); 
      setRandomCrashes(storedData.randomCrashes || 0); 
    } else {
      localStorage.clear();
      setDate(formattedToday);
    }
  }, []);

  useEffect(() => {
    const dataToStore = {
      date,
      gameName,
      ticketlink,
      testType,
      gameVersionNumber,
      gameVersions,
      testDuration,
      testCompleted,
      additionalInfo,
      testedLanguages,
      untestedLanguages,
      items,
      achievementStatus, 
      randomCrashes,
      pcConfig,
    };
    localStorage.setItem('reportData', JSON.stringify(dataToStore));
  }, [date, gameName, ticketlink, testType, gameVersionNumber, gameVersions, testDuration, testCompleted, additionalInfo, testedLanguages, untestedLanguages, items, levels, achievementStatus, randomCrashes,pcConfig]);

  const handleRemovePcConfig = () => {
    setPcConfig({ gpu: '', cpu: '', ram: '' }); 
    setShowPcConfig(false);
  };

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
      ticketlink,
      testType,
      gameVersionNumber,
      gameVersions,
      testedLanguages,
      untestedLanguages,
      testDuration,
      testCompleted,
      additionalInfo,
      items,
      levels,
      achievementStatus, 
      randomCrashes,
      pcConfig,
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
          <label>Ticket du test:</label>
          <input 
            type="text" 
            value={ticketlink} 
            onChange={(e) => setTicketLink(e.target.value)} 
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
            <option value="MS">MS</option>
            <option value="SWITCH">SWITCH</option>
            <option value="DRM FREE">DRM FREE</option>
            <option value="DRM SDK FREE">DRM SDK FREE</option>
            <option value="STEAM DECK">STEAM DECK</option>
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
          <label>Nombre de Crashs Random:</label>
          <input 
            type="number" 
            value={randomCrashes} 
            onChange={(e) => setRandomCrashes(parseInt(e.target.value) || 0)} 
            min="0"
          />
        </div>
        <div>
          <label>État des Succès:</label>
          <select value={achievementStatus} onChange={(e) => setAchievementStatus(e.target.value)}>
            <option value="">Sélectionner une option</option>
            <option value="Tous débloquables">Tous débloquables</option>
            <option value="Partiellement débloquable">Partiellement débloquable</option>
            <option value="Pas déblocable">Pas déblocable</option>
            <option value="N/A">N/A</option>
          </select>
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
      
        {showPcConfig && (
        <PcConfigInput
          gpu={pcConfig.gpu}
          cpu={pcConfig.cpu}
          ram={pcConfig.ram}
          setGpu={(gpu) => setPcConfig({ ...pcConfig, gpu })}
          setCpu={(cpu) => setPcConfig({ ...pcConfig, cpu })}
          setRam={(ram) => setPcConfig({ ...pcConfig, ram })}
          handleRemove={handleRemovePcConfig}
        />
      )}

        <button type="button" onClick={handleAddItem}>Ajouter un bug</button>
        <br/>
        <br/>
        <button type="button" onClick={() => setShowPcConfig(!showPcConfig)}>
        {showPcConfig ? 'Cacher Config PC' : 'Afficher Config PC'}
        </button>
        <br/>
        <br/>
        <button type="submit">Créer le Rapport</button>
      </form>
      <Modal show={showModal} handleClose={() => setShowModal(false)} reportData={reportData} />
    </div>
  );
}

export default CreateReport;
