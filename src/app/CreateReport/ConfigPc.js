// src/app/CreateReport/PcConfigInput.js
import React from 'react';

const PcConfigInput = ({ gpu, cpu, ram, setGpu, setCpu, setRam, handleRemove }) => {
  return (
    <div className="item">
      <h3>Configuration PC</h3>
      <div>
        <label>Carte Graphique:</label>
        <input 
          type="text" 
          value={gpu} 
          onChange={(e) => setGpu(e.target.value)} 
          placeholder="Ex: NVIDIA GTX 3080" 
        />
      </div>
      <div>
        <label>Processeur:</label>
        <input 
          type="text" 
          value={cpu} 
          onChange={(e) => setCpu(e.target.value)} 
          placeholder="Ex: Intel i9 9900K" 
        />
      </div>
      <div>
        <label>RAM:</label>
        <input 
          type="text" 
          value={ram} 
          onChange={(e) => setRam(e.target.value)} 
          placeholder="Ex: 32GB DDR4" 
        />
      </div>
      <br />
      <br />
    </div>
  );
};

export default PcConfigInput;
