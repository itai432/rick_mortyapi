import React from 'react';
import Logo from '../components/Logo';
import Banner from '../components/Banner';
import CharacterTable from '../components/CharacterTable';
import ButtonGrupe from '../components/ButtonGrupe';
import '../style/Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="header">
        <Banner />
      </div>
      <div className="logo_homepage">
        <Logo />
      </div>
      <ButtonGrupe />
      <div className="hole_page">
        <CharacterTable />
      </div>
    </div>
  );
}

export default Home;
