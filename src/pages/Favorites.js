import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    // Após pagina ter sido carregada, define o loading como true, chama a funcao pra pegar musicas favoritas e loading false
    this.setState({
      loading: true,
    }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({
        favoriteSongs,
        loading: false,
      });
    });
  }

  updateSongs = () => {
    this.componentDidMount();
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Músicas favoritas</h2>

        { loading && <Loading />}
        {favoriteSongs.length > 0
        && favoriteSongs.map((favoriteSong, index) => (
          <MusicCard
            key={ index }
            song={ favoriteSong }
            updateSongs={ this.updateSongs }
          />
        ))}
      </div>
    );
  }
}

// passar pra props uma funcao, se ela for chamada mudar o valor do estado
