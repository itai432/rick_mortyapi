import React, { useState } from 'react';
import Logo from '../components/Logo';
import Banner from '../components/Banner';
import CharacterTable from '../components/CharacterTable';
import ButtonGrupe from '../components/ButtonGrupe';
import SearchBar from '../components/SearchBar';
import '../style/Home.scss';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
      <ButtonGrupe />
      <SearchBar onSearch={handleSearch}></SearchBar>
      <div className="hole_page">
        <CharacterTable searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default Home;
