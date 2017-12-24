import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputRange from 'react-input-range'
import classNames from 'classnames'
import throttle from 'lodash/throttle'
import DEFAULT_CLASS_NAMES from 'react-input-range/src/js/input-range/default-class-names'
import { clientId } from '../utils/soundCloudApi'
import timeFromSec from '../utils/time'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0, // time in seconds
      pause: true,
      lastTrack: null,
      muted: false,
      volume: 50,
    }

    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.mute = this.mute.bind(this)
    this.handleTimeSliderChange = this.handleTimeSliderChange.bind(this)
    this.handleTimeSliderChange = throttle(this.handleTimeSliderChange, 200)
    this.handleVolumeSliderChange = this.handleVolumeSliderChange.bind(this)
    this.handleVolumeSliderChange = throttle(this.handleVolumeSliderChange, 200)
    this.handlePlaybackComplete = this.handlePlaybackComplete.bind(this)
    this.setVolume = this.setVolume.bind(this)
  }

  componentDidMount() {
    if (this.props.track.stream_url) {
      this.play()
    }
    this.setVolume()
  }

  componentDidUpdate() {
    this.audio.muted = this.state.muted
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  setVolume() {
    this.audio.volume = this.state.volume / 100
  }

  mute() {
    this.setState(prevState => ({ muted: !prevState.muted }))
  }

  handleTimeSliderChange(value) {
    this.setState({ value })
    this.audio.currentTime = value
  }

  handleVolumeSliderChange(volume) {
    this.setState({ volume })
    this.setVolume()
  }

  handlePlaybackComplete() {
    this.pause()
    this.setState({ value: 0 })
  }

  play() {
    this.setState({ pause: false })
    if (this.state.lastTrack !== this.props.track.stream_url) {
      this.setState({ value: 0, lastTrack: this.props.track.stream_url })
    }
    this.audio.play()
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    this.timerId = setInterval(() => {
      this.setState(prevState => ({ value: prevState.value + 1 }))
    }, 1000)
  }

  pause() {
    this.setState({ pause: true })
    this.audio.pause()
    clearInterval(this.timerId)
  }

  render() {
    const trackTitle = this.props.track.title
    const trackUrl = this.props.track.stream_url
    const duration = this.props.track.duration

    return (
      <section className="player">
        <div className="wrap player__wrap">
          <div className="player__track-title">{trackTitle}</div>
          <div className="player__controls">
            <audio
              onCanPlay={this.play}
              onEnded={this.handlePlaybackComplete}
              src={`${trackUrl}?client_id=${clientId}`}
              ref={audio => {
                this.audio = audio
              }}
            />
            <button
              className={classNames('btn', 'player__btn-play', {
                'player__btn-play--active': this.state.pause,
              })}
              onClick={this.play}
            />
            <button
              className={classNames('btn', 'player__btn-pause', {
                'player__btn-pause--active': !this.state.pause,
              })}
              onClick={this.pause}
            />
            <div className="player__time">{timeFromSec(this.state.value)}</div>
            <InputRange
              classNames={{
                ...DEFAULT_CLASS_NAMES,
                inputRange: 'input-range player__time-slider',
              }}
              minValue={0}
              maxValue={Math.floor(duration / 1000)}
              value={this.state.value}
              onChange={this.handleTimeSliderChange}
            />
            <button
              className={classNames('btn', 'player__btn-mute', {
                'player__btn-mute--active': this.state.muted,
              })}
              onClick={this.mute}
            />
            <div className="player__volume-slider-container">
              <InputRange
                classNames={{
                  ...DEFAULT_CLASS_NAMES,
                  inputRange: 'input-range player__volume-slider',
                }}
                minValue={0}
                maxValue={100}
                value={this.state.volume}
                onChange={this.handleVolumeSliderChange}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  track: state.tracks.nowPlaying,
})

Player.propTypes = {
  track: PropTypes.shape({
    duration: PropTypes.number,
    stream_url: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
}

export default connect(mapStateToProps)(Player)
