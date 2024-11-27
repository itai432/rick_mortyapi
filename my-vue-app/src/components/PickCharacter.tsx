import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchContext } from '../context/SearchContext';
import CharacterDetails from './CharacterDetails';
import emptyStateIcon from '../assets/Group 204.png';
import '../style/PickCharacter.scss';

interface PickCharacterProps {
  searchQuery: string;
}

const PickCharacter: React.FC<PickCharacterProps> = ({ searchQuery }) => {
  const { characters, addCharacter } = useSearchContext(); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!searchQuery || searchQuery.trim() === '' || !/^\d+$/.test(searchQuery)) {
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${searchQuery}`);
        const newCharacter = response.data;

        addCharacter(newCharacter);
      } catch (err) {
        setError('Character not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [searchQuery, addCharacter]);

  return (
    <div className="pick-character-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {characters.length > 0 ? (
        <div className="cards-container">
          {characters.map((character) => (
            <div key={character.id} className="character-card">
              <CharacterDetails character={character} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <img src={emptyStateIcon} alt="No results" className="empty-state-icon" />
          <p className="empty-state-text">Search for a character id in order to view a character</p>
        </div>
      )}
    </div>
  );
};

export default PickCharacter;
