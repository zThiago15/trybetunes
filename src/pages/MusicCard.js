import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
      loading: false,
      favorites: '',
    };

    this.favoriteSong = this.favoriteSong.bind(this);
    this.checkIfSongIsFavorited = this.checkIfSongIsFavorited.bind(this);
  }

  componentDidMount() {
    const { isFavorite } = this.state;
    const { song } = this.props;

    this.setState({
      loading: true,
    }, async () => {
      const favorites = await getFavoriteSongs();

      this.setState({
        favorites, // lista de favoritos
        loading: false,
      }, () => this.checkIfSongIsFavorited()); // checar se é favorito depois de definir state com a lista
    });
  }

  checkIfSongIsFavorited() {
    const { song } = this.props;
    const { favorites } = this.state;

    // checar se na lista de favoritos, contem esta musica
    const isFavorite = favorites.some((favoriteSong) => favoriteSong.trackId === song.trackId );

    this.setState({
      isFavorite,
    });
  }

  favoriteSong({ target: { checked } }) {
    const { song } = this.props;

    this.setState({
      isFavorite: checked,
      loading: true,
    }, async () => {
      if (!checked) {
        // se a música não estiver favoritada, removê-la
        await removeSong(song);
      } else {
        await addSong(song);
      }

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
