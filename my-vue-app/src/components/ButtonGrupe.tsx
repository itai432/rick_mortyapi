import React from 'react';
import '../style/ButtonGroup.scss';

interface ButtonGrupeProps {
  activeTab: 'browse' | 'pick'; // המצב הפעיל
  onBrowseClick: () => void; // פונקציה ללחיצה על Browse
  onPickCharacterClick: () => void; // פונקציה ללחיצה על Pick a Character
}

const ButtonGrupe: React.FC<ButtonGrupeProps> = ({ activeTab, onBrowseClick, onPickCharacterClick }) => {
  return (
    <div className="button_group">
      <button
        className={`browse_button ${activeTab === 'browse' ? 'active' : ''}`}
        onClick={onBrowseClick}
      >
        Browse
      </button>
      <button
        className={`character_button ${activeTab === 'pick' ? 'active' : ''}`}
        onClick={onPickCharacterClick}
      >
        Pick a Character
      </button>
    </div>
  );
};

export default ButtonGrupe;
