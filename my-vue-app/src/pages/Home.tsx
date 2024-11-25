import React, { useState } from 'react';
import Logo from '../components/Logo';
import Banner from '../components/Banner';
import CharacterTable from '../components/CharacterTable';
import ButtonGrupe from '../components/ButtonGrupe';
import SearchBar from '../components/SearchBar';
import PickCharacter from '../components/PickCharacter';
import '../style/Home.scss';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'pick'>('browse'); 
  const [searchQuery, setSearchQuery] = useState<string>(''); 

  const handleBrowseClick = () => {
    setActiveTab('browse');
    setSearchQuery('');
  };
  
  const handlePickCharacterClick = () => {
    setActiveTab('pick'); 
  };
  

  const handleSearch = (query: string) => {
    setSearchQuery(query); 
  };

  return (
    <div className="home">
      <div className="header">
        <Banner />
      </div>
      <div className="logo_homepage">
        <Logo />
      </div>
      <ButtonGrupe
        activeTab={activeTab} // העברת המצב הפעיל
        onBrowseClick={handleBrowseClick}
        onPickCharacterClick={handlePickCharacterClick}
      />
      <SearchBar
        onSearch={handleSearch}
        placeholder={activeTab === 'pick' ? 'Enter character ID...' : 'Search for a name or ID...'}
      />
      <div className="hole_page">
        {activeTab === 'pick' ? (
          <PickCharacter searchQuery={searchQuery} />
        ) : (
          <CharacterTable searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
};

export default Home;
