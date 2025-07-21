// src/app/CreateReport/RankTitleLinkInput.js
import React from 'react';

const RankTitleLinkInput = ({
  index, rank, title, link,
  isCrash, isBlocking, isReopen, isRegressed,
  setRank, setTitle, setLink,
  setIsCrash, setIsBlocking, setIsReopen, setIsClosed,
  handleRemove
}) => {
  return (
    <div className="item">
      <h3>Bug {index + 1}</h3>
      <div>
        <label>Rank:</label>
        <select value={rank} onChange={(e) => setRank(index, e.target.value)}>
          <option value="">Sélectionner un rang</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>
      <div>
        <label>Titre:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(index, e.target.value)} 
        />
      </div>
      <div>
        <label>Lien:</label>
        <input 
          type="text" 
          value={link} 
          onChange={(e) => setLink(index, e.target.value)} 
        />
      </div>
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={isCrash} 
            onChange={(e) => setIsCrash(index, e.target.checked)} 
          />
          Crash
        </label>
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={isBlocking} 
            onChange={(e) => setIsBlocking(index, e.target.checked)} 
          />
          Bloquant
        <div style={{ width: '100%', borderTop: '1px solid #ccc', margin: '8px 0'}}></div>
        <span style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px', marginLeft: '10px' }}>|Regression</span>
        </label>
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={isReopen} 
            onChange={(e) => setIsReopen(index, e.target.checked)} 
          />
          Reopen
        </label>
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={isRegressed} 
            onChange={(e) => setIsClosed(index, e.target.checked)} 
          />
          Closed
        </label>
      </div>
      <button type="button" onClick={() => handleRemove(index)} className="remove-button">Remove</button>
      <br/>
      <br/>
      <br />
      <br />
    </div>
  );
}

export default RankTitleLinkInput;
