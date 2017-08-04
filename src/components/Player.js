import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import { clientId } from '../utils/soundCloudApi';

class Player extends Component {

  render() {
    const track = this.props.track;
    return (
      <div className="player">
        <audio
          controls
          autoPlay
          src={`${track}?client_id=${clientId}`}
        />
        <button className="btn player__ctrl-btn">Play</button>
        <InputRange
          className="player__timeSlider"
          minValue={0}
          maxValue={100}
          value={50}
          onChange={() => {console.log('InputRange:', this.value)}}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    track: state.tracks.nowPlaying,
  }
);

export default connect(mapStateToProps)(Player);
