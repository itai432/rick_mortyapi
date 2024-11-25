import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterDetails from './CharacterDetails';
import emptyStateIcon from '../assets/Group 204.png'; // ייבוא האייקון החדש
import '../style/PickCharacter.scss';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  image: string;
}

interface PickCharacterProps {
  searchQuery: string; // קלט החיפוש
}

const PickCharacter: React.FC<PickCharacterProps> = ({ searchQuery }) => {
  const [characters, setCharacters] = useState<Character[]>([]); // שמירה על כל התוצאות
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

        setCharacters((prevCharacters) => {
          const existingIds = new Set(prevCharacters.map((char) => char.id));
          if (!existingIds.has(newCharacter.id)) {
            return [...prevCharacters, newCharacter];
          }
          return prevCharacters;
        });
      } catch (err) {
        setError('Character not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [searchQuery]);

  return (
    <div className="pick-character-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {characters.length > 0 ? (
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Gender</th>
              <th>Origin</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => (
              <React.Fragment key={character.id}>
                <tr>
                  <td>{character.name}</td>
                  <td>{character.status}</td>
                  <td>{character.gender}</td>
                  <td>{character.origin.name}</td>
                </tr>
                <tr className="expanded-row">
                  <td colSpan={4}>
                    <CharacterDetails character={character} />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
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
