import React from 'react';
import Search from './Search';

const Header = () => (
  <header className="header">
    <div className="wrap">
      <div className="header__logo">Logo.jpg</div>
      <Search />
    </div>
  </header>
);

export default Header;
