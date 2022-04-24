import React, { Component } from 'react';
import Header from '../Header';
import { getUser } from '../services/userAPI';
import '../index.css';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      dataUser: '',
    };
  }

  componentDidMount() {
    // recuperar dados e colocar no state
    this.setState({
      loading: true
    }, async () => {
      const dataUser = await getUser();

      this.setState({
        loading: false,
        dataUser,
      });
    });
  }

  render() {
    const { dataUser } = this.state;
    const { name, description, email, image } = dataUser;

    return (
      <div data-testid="page-profile">
        <Header />
        <div className="editProfile">
          <img
            data-testid="profile-image"
            src={ image }
            alt="user"
            id="userPhoto"
          />
          <Link to="/profile/edit">
            <button type="button">Editar perfil</button>
          </Link>
        </div>

        <h2>Nome</h2>
        <p>{name}</p>

        <h2>E-mail</h2>
        <p>{email}</p>

        <h2>Descrição</h2>
        <p>{description}</p>
      </div>
    );
  }
}
