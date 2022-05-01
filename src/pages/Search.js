import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      iptSearch: '',
      loading: '',
      albums: '',
      nameArtist: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  searchArtist(event) {
    event.preventDefault();
    const { iptSearch } = this.state;

    this.setState({
      loading: true,
      nameArtist: iptSearch,
    }, async () => {
      const albums = await searchAlbumsAPI(iptSearch);
      this.setState({
        iptSearch: '',
        albums,
        loading: false,
      });
    });
  }

  notFoundAlbum(album) {
    if (typeof album === 'object' && album.length === 0) {
      return true;
    }

    return false;
  }

  render() {
    const { iptSearch, loading, albums, nameArtist } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading === true && <Loading />}
        {!loading
        && (
          <form onSubmit={ this.searchArtist }>
            <input
              placeholder="Pesquisar nome do artista"
              name="iptSearch"
              value={ iptSearch }
              onChange={ this.handleChange }
              data-testid="search-artist-input"
            />
            <button
              type="submit"
              disabled={ iptSearch.length < 2 }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        )}

        {albums && <p>{`Resultado de álbuns de: ${nameArtist}`}</p>}
        {albums && albums.map((album) => {
          const { artistName, collectionId, collectionName, artworkUrl100 } = album;

          return (
            <Link
              key={ collectionId }
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              <img src={ artworkUrl100 } alt={ `Album ${collectionName}` } />
              <h2>{ collectionName }</h2>
              <p>{ artistName }</p>
            </Link>
          );
        })}

        {this.notFoundAlbum(albums) && <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}
