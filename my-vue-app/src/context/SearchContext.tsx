import React, { createContext, useContext, useState, ReactNode } from "react";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  image: string;
}

interface SearchContextType {
  characters: Character[];
  addCharacter: (character: Character) => void;
  clearCharacters: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const addCharacter = (character: Character) => {
    setCharacters((prevCharacters) => {
      const existingIds = new Set(prevCharacters.map((char) => char.id));
      if (!existingIds.has(character.id)) {
        return [...prevCharacters, character];
      }
      return prevCharacters;
    });
  };

  const clearCharacters = () => {
    setCharacters([]);
  };

  return (
    <SearchContext.Provider
      value={{ characters, addCharacter, clearCharacters }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
