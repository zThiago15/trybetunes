import React, { Component } from 'react';
import Header from '../Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      iptSearch: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { iptSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            placeholder="Pesquisar nome do artista"
            name="iptSearch"
            value={ iptSearch }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button type="button" disabled={ iptSearch.length < 2 } data-testid="search-artist-button">Procurar</button>
        </form>
      </div>
    );
  }
}
