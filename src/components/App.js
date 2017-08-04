import React from 'react';
import Header from './Header';
import Tracks from './Tracks';
import Player from './Player';

const App = () => (
  <div className="outer-wrap">
    <Header />
    <Player />
    <Tracks />
  </div>
);

export default App;
