import React from 'react';
import '../styles/Home.css';
import TopBar from '../components/Topbar';
import Recommendations from '../components/Recommendations';
import FeaturedProduct from '../components/FeaturedProduct';
//import ChatForm from './ChatForm';
function Home() {
  return (
    <div className='HomeContainer' id='home-container'>
      <TopBar />
      <Recommendations />
      <FeaturedProduct />
    </div>
  );
}

export default Home;
