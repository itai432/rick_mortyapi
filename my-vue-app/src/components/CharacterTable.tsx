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

const CharacterTable: React.FC<CharacterTableProps> = ({
  searchQuery,
  searchById = false,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null); 

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          searchById && searchQuery
            ? `https://rickandmortyapi.com/api/character/${searchQuery}`
            : `https://rickandmortyapi.com/api/character?page=${currentPage}&name=${searchQuery}`
        );

        setCharacters(
          searchById && searchQuery
            ? [response.data] 
            : response.data.results
        );
        setTotalPages(searchById ? 1 : response.data.info.pages);
        setCharacter(null);
      } catch (err) {
        setError("Error loading characters.");
        setCharacters([]);
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchQuery, searchById, currentPage]);

  const handleRowClick = (id: number) => {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
          {characters.map((character) => (
            <React.Fragment key={character.id}>
              <tr
                className="clickable-row"
                onClick={() => handleRowClick(character.id)}
              >
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
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterTable;
