import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      artistName: '',
      artworkUrl100: '',
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params;

    this.setState({
    }, async () => {
      const songs = await getMusics(id); // id do album
      // Atribuindo nome da banda/artista e album ao state
      const { artistName, artworkUrl100, collectionName } = songs[0];

      this.setState({
        songs,
        artistName,
        artworkUrl100,
        collectionName,
      });
    });
  }

  render() {
    const { songs, artistName, artworkUrl100, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ artworkUrl100 } alt={ artistName } />
          <h1 data-testid="album-name">{collectionName}</h1>
          <h2 data-testid="artist-name">{artistName}</h2>
        </div>

        {songs.map((song, index) => (
          <MusicCard key={ index } song={ song } />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;
