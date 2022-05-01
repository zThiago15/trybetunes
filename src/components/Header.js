import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultPhoto from '../images/no-user-photo.svg';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from '../css/Header.module.css';
import logowhite from '../images/logo-white.svg';

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
      <header data-testid="header-component" className={ styles.header }>

        {loading === false ? (
          <>
            <div className={ styles.upperHeader }>
              <img src={ logowhite } alt="Logo da Trybe" />

              <span className={ styles.userBtn }>
                <img src={ defaultPhoto } alt="Foto do usuário" />
                <h1 data-testid="header-user-name">
                  { name }
                </h1>
              </span>
            </div>

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
