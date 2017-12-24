import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setNowPlaying } from '../actions'

/* eslint-disable camelcase */
const Track = ({ title, artwork_url, stream_url, duration, onClick }) => (
  <li className="track">
    <div
      className="track__wrap"
      onClick={() => onClick({ title, stream_url, duration })}
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
)

class Tracks extends Component {
  constructor() {
    super()
    this.state = {
      tracks: [],
    }
    this.playTrack = this.playTrack.bind(this)
  }

  componentDidMount() {
    SC.get('/tracks') // eslint-disable-line no-undef
      .then(tracks => {
        this.setState({ tracks })
      })
  }

  playTrack(track) {
    this.props.setNowPlaying(track)
  }

  render() {
    const tracks = this.props.tracks.length ? this.props.tracks : this.state.tracks
    return (
      <section className="tracks">
        <div className="wrap">
          <ul className="tracks__list">
            {tracks.map(item => <Track key={item.id} onClick={this.playTrack} {...item} />)}
          </ul>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  tracks: state.tracks.trackList,
})

const mapDispatchToProps = dispatch => ({
  setNowPlaying: bindActionCreators(setNowPlaying, dispatch),
})

Tracks.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNowPlaying: PropTypes.func.isRequired,
}

Track.defaultProps = {
  artwork_url: null,
}

Track.propTypes = {
  title: PropTypes.string.isRequired,
  stream_url: PropTypes.string.isRequired,
  artwork_url: PropTypes.string,
  duration: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracks)
