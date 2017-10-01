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
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input search__input"
            ref={(input) => { this.searchInput = input; }}
            placeholder="type track name here.."
          />
        </form>
      </div>
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
