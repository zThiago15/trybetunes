import React, { Component } from 'react';
import Header from '../Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      loading: 'not initialized',
      songs: [],
      artistName: '',
      artworkUrl100: '',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      loading: true,
    }, async () => {
      const songs = await getMusics(id);
      // Atribuindo nome da banda/artista e album ao state
      const { artistName, artworkUrl100, collectionName } = songs[0];

      this.setState({
        songs,
        loading: false,
        artistName,
        artworkUrl100,
        collectionName,
       });
    });
  };

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
