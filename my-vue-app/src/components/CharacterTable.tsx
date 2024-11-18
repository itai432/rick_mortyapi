import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterDetails from './CharacterDetails';
import '../style/CharacterTable.scss';

interface Character {
  id: number;
  name: string; 
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  image: string;
}


interface CharacterTableProps {
  searchQuery: string;
}

const CharacterTable: React.FC<CharacterTableProps> = ({ searchQuery }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        console.log(response.data.results); 
        setCharacters(response.data.results);
      } catch (err) {
        setError('Error loading characters.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchCharacters();
  }, []);



  const handleRowClick = (id: number) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(id)) {
        newExpandedRows.delete(id);
      } else {
        newExpandedRows.add(id);
      }
      return newExpandedRows;
    });
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-container">
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
          {filteredCharacters.map((character) => (
            <React.Fragment key={character.id}>
              <tr onClick={() => handleRowClick(character.id)}>
                <td>{character.name}</td>
                <td>{character.status}</td>
                <td>{character.gender}</td>
                <td>{character.origin.name}</td>
              </tr>
              {expandedRows.has(character.id) && (
                <tr className="expanded-row">
                  <td colSpan={4}>
                    <CharacterDetails character={character} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
