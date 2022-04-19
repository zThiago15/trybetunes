import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      loading: false,
    };

    this.favoriteSong = this.favoriteSong.bind(this);
  }

  favoriteSong({ target }) {
    const { song } = this.props;

    this.setState({
      isFavorite: target.checked,
      loading: true,
    }, async () => {
      await addSong(song);

      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props.song;
    const { loading, isFavorite } = this.state;

    return (
      <div>
        {!loading
        && trackName && previewUrl
        && (
          <>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              <code>audio</code>
            </audio>
            <label htmlFor="favorite">
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.favoriteSong }
                type="checkbox"
                checked={ isFavorite }
              />
            </label>
          </>)}
        {loading === true && <Loading />}

      </div>
    );
  }
}
