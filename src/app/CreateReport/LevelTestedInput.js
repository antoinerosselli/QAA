// src/app/CreateReport/LevelTestedInput.js
import React from 'react';

const LevelTestedInput = ({ index, levelName, levelReview, selectedBugs, setLevelName, setLevelReview, setSelectedBugs, handleRemove, bugs }) => {
  return (
    <div className="item">
      <h3>Niveau {index + 1}</h3>
      <div>
        <label>Nom du Niveau:</label>
        <input 
          type="text" 
          value={levelName} 
          onChange={(e) => setLevelName(index, e.target.value)} 
        />
      </div>
      <div>
        <label>Avis sur le Niveau:</label>
        <textarea 
          value={levelReview} 
          onChange={(e) => setLevelReview(index, e.target.value)} 
          rows="4"
          style={{ width: '100%',color: 'black'}}
        ></textarea>
      </div>
      <div>
        <label>Bugs liés à ce Niveau:</label>
        <select multiple value={selectedBugs} onChange={(e) => {
          const options = e.target.options;
          const selectedValues = [];
          for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
              selectedValues.push(options[i].value);
            }
          }
          setSelectedBugs(index, selectedValues);
        }}>
          {bugs.map((bug, i) => (
            <option key={i} value={i}>Bug {i + 1}: {bug.title}</option>
          ))}
        </select>
      </div>
      <button type="button" onClick={() => handleRemove(index)}>Remove</button>
      <br/>
      <br/>
    </div>
  );
}

export default LevelTestedInput;
