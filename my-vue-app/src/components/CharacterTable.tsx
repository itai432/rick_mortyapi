import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/CharacterTable.scss';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  more: string;
}

const CharacterTable: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
      } catch (err) {
        setError('Failed to fetch characters.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
            <th>Species</th>
            <th>Gender</th>
            <th>Origin</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.id}>
              <td data-label="id">{character.id}</td>
              <td data-label="Name">{character.name}</td>
              <td data-label="Status">{character.status}</td>
              <td data-label="Species">{character.species}</td>
              <td data-label="Gender">{character.gender}</td>
              <td data-label="Origin">{character.origin.name}</td>
              <td data-label="more">{character.more}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
