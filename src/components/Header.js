import React from 'react';
import Search from './Search';

const Header = () => (
  <header className="header">
    <div className="wrap header__wrap">
      <div className="header__logo">
        <p>Muzlist</p>
      </div>
      <Search />
    </div>
  </header>
);

export default Header;
