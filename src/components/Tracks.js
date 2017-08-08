import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNowPlaying } from '../actions';

const Track = ({ title, stream_url, artwork_url, onClick }) => (
/* eslint-disable camelcase */
  <li className="track">
    <div
      className="track__wrap"
      onClick={onClick}
      data-stream={stream_url}
      role="button"
      tabIndex="-1"
    >
      <div className="track__img">
        <img src={artwork_url} alt={title} />
      </div>
      <p className="track__title">{title}</p>
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
      <section className="tracks">
        <div className="wrap">
          <ul className="tracks__list">
            {tracks.map(item => (
              <Track
                key={item.id}
                onClick={this.playTrack}
                {...item}
              />
            ))}
          </ul>
        </div>
      </section>
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
  title: PropTypes.string.isRequired,
  stream_url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
