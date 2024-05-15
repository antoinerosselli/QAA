// src/app/CreateReport/RankTitleLinkInput.js
import React from 'react';

const RankTitleLinkInput = ({ index, rank, title, link, setRank, setTitle, setLink, handleRemove }) => {
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
      <button type="button" onClick={() => handleRemove(index)}>Remove</button>
      <br/>
      <br/>
    </div>
  );
}

export default RankTitleLinkInput;
