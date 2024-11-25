import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterDetails from "./CharacterDetails";
import "../style/CharacterTable.scss";

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
  searchById?: boolean; 
}

const CharacterTable: React.FC<CharacterTableProps> = ({ searchQuery, searchById = false }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [character, setCharacter] = useState<Character | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        if (searchById && searchQuery) {
          const response = await axios.get(
            `https://rickandmortyapi.com/api/character/${searchQuery}`
          );
          setCharacter(response.data);
          setCharacters([]);
        } else if (searchQuery) {
          const response = await axios.get(
            `https://rickandmortyapi.com/api/character/?name=${searchQuery}`
          );
          setCharacters(response.data.results);
          setCharacter(null);
        } else {
          const response = await axios.get(
            `https://rickandmortyapi.com/api/character?page=${currentPage}`
          );
          const newCharacters = response.data.results;

          setCharacters((prevCharacters) => {
            const existingIds = new Set(prevCharacters.map((char) => char.id));
            const filteredNewCharacters = newCharacters.filter(
              (char: any) => !existingIds.has(char.id)
            );
            return [...prevCharacters, ...filteredNewCharacters];
          });

          setTotalPages(response.data.info.pages);
          setCharacter(null);
        }
      } catch (err) {
        setError("Error loading characters.");
        setCharacters([]);
        setCharacter(null);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchCharacters();
  }, [searchQuery, searchById, currentPage]);

  const handleRowClick = (id: number) => {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (loading && currentPage === 1) return <p>Loading...</p>;
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
          {character ? (
            <React.Fragment key={character.id}>
              <tr onClick={() => handleRowClick(character.id)}>
                <td>{character.name}</td>
                <td>{character.status}</td>
                <td>{character.gender}</td>
                <td>{character.origin.name}</td>
              </tr>
              {expandedRowId === character.id && (
                <tr className="expanded-row">
                  <td colSpan={4}>
                    <CharacterDetails character={character} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ) : (
            characters.map((character) => (
              <React.Fragment key={character.id}>
                <tr onClick={() => handleRowClick(character.id)}>
                  <td>{character.name}</td>
                  <td>{character.status}</td>
                  <td>{character.gender}</td>
                  <td>{character.origin.name}</td>
                </tr>
                {expandedRowId === character.id && (
                  <tr className="expanded-row">
                    <td colSpan={4}>
                      <CharacterDetails character={character} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      {!searchById && currentPage < totalPages && (
        <div className="load-more-container">
          <button
            className="load-more-button"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      </table>
    </div>
  );
};

export default CharacterTable;
