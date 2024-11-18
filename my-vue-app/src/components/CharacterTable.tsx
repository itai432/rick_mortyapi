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
}

const CharacterTable: React.FC<CharacterTableProps> = ({ searchQuery }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1); // הוספת מצב לניהול העמוד הנוכחי
  const [totalPages, setTotalPages] = useState<number>(1); // הוספת מצב לניהול מספר העמודים הכולל
  const [loadingMore, setLoadingMore] = useState<boolean>(false); // הוספת מצב לניהול טעינת עמודים נוספים

  useEffect(() => {
    const fetchCharacters = async (page: number) => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const newCharacters = response.data.results;

        // Append only unique characters to avoid duplicates
        setCharacters((prevCharacters) => {
          const existingIds = new Set(prevCharacters.map((char) => char.id));
          const filteredNewCharacters = newCharacters.filter(
            (char) => !existingIds.has(char.id)
          );
          return [...prevCharacters, ...filteredNewCharacters];
        });

        setTotalPages(response.data.info.pages);
      } catch (err) {
        setError("Error loading characters.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchCharacters(currentPage);
  }, [currentPage]);

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

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {currentPage < totalPages && (
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
