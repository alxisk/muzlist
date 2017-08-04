import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNowPlaying } from '../actions';

const Track = ({ permalink, stream_url, artwork_url, onClick }) => (
/* eslint-disable camelcase */
  <li class="track">
    <div
      onClick={onClick}
      data-stream={stream_url}
      role="button"
      tabIndex="-1"
    >
      <div className="track__img">
        <img src={artwork_url} alt={permalink} />
      </div>
      <p className="track__title">{permalink}</p>
    </div>
  </li>
/* eslint-enable camelcase */
);

class Tracks extends Component {
  constructor() {
    super();
    this.state = {
      tracks: [],
    };
    this.playTrack = this.playTrack.bind(this);
  }

  componentDidMount() {
    SC.get('/tracks') // eslint-disable-line no-undef
      .then(
        (tracks) => { this.setState({ tracks }); }
      );
  }

  playTrack(event) {
    const track = event.target.getAttribute('data-stream');
    this.props.setNowPlaying(track);
  }

  render() {
    const tracks = this.props.tracks.length ? this.props.tracks : this.state.tracks;
    return (
      <div className="wrap">
        <ul>
          {tracks.map(item => (
            <Track
              key={item.id}
              onClick={this.playTrack}
              {...item}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    tracks: state.tracks.trackList,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setNowPlaying: bindActionCreators(setNowPlaying, dispatch),
  }
);

Tracks.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNowPlaying: PropTypes.func.isRequired,
};

Track.propTypes = {
  permalink: PropTypes.string.isRequired,
  stream_url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
