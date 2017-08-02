import React, { Component } from 'react';

class Search extends Component {
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="type track name here.." />
      </form>
    );
  }
}

const Header = () => (
  <header>
    <div className="wrap">
      <div className="logo">Logo.jpg</div>
      <Search />
    </div>
  </header>
);

export default Header;
