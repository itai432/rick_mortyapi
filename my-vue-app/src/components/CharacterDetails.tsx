import React from 'react';
import '../style/CharacterDetails.scss';

interface CharacterDetailsProps {
  character: {
    id: number;
    name: string;
    species: string;
    status: string;
    gender: string;
    origin: { name: string };
    image: string;
  };
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => (
  <div className="character-details-container">
    <div className="character-image">
      <img src={character.image} alt={character.name} />
    </div>
    <div className="character-info">
      <h3>Character Description</h3>
      <p>
        <strong>ID:</strong> {character.id}
      </p>
      <p>
        <strong>Name:</strong> {character.name}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Origin:</strong> {character.origin.name}
      </p>
      <p>
        <strong>Species:</strong> {character.species}
      </p>
      <p>
        <strong>Status:</strong> {character.status}
      </p>
    </div>
  </div>
);

export default CharacterDetails;
