import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import Loading from './pages/Loading';

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
            <nav className="navHeader">
              <ul><Link data-testid="link-to-search" to="/search">Search</Link></ul>
              <ul>
                <Link data-testid="link-to-favorites" to="/favorites">
                  Favorite Songs
                </Link>
              </ul>
              <ul><Link data-testid="link-to-profile" to="/profile">Profile</Link></ul>
            </nav>
            <h1 data-testid="header-user-name">
              { name }
            </h1>
          </>
        ) : <Loading /> }
      </header>

    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool,
}.isRequired;
