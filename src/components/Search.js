import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestTracks } from '../actions';

class Search extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const query = this.searchInput.value;
    this.props.requestTracks(query);
  }

  render() {
    return (
      <form className="search" onSubmit={this.handleSubmit}>
        <input type="text" ref={(input) => { this.searchInput = input; }} placeholder="type track name here.." />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    requestTracks: bindActionCreators(requestTracks, dispatch),
  }
);

Search.propTypes = {
  requestTracks: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Search);
