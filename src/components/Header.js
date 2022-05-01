import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultPhoto from '../images/no-user-photo.svg';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: '',
      username: '',
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,

    }, async () => {
      const user = await getUser();

      this.setState({
        loading: false,
        username: user,
      });
    });
  }

  render() {
    const { loading, username: { name } } = this.state;
    return (
      <header data-testid="header-component">

        {loading === false ? (
          <>
            <span>
              <img src={ defaultPhoto } alt="Foto do usuário" />
              <h1 data-testid="header-user-name">
                { name }
              </h1>
            </span>
            <nav className="navHeader">
              <ul><Link data-testid="link-to-search" to="/search">Search</Link></ul>
              <ul>
                <Link data-testid="link-to-favorites" to="/favorites">
                  Favorite Songs
                </Link>
              </ul>
              <ul><Link data-testid="link-to-profile" to="/profile">Profile</Link></ul>
            </nav>
          </>
        ) : <Loading /> }
      </header>

    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool,
}.isRequired;
