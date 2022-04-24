import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { getUser } from '../services/userAPI';
import '../index.css';
import Loading from './Loading';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      dataUser: '',
    };
  }

  componentDidMount() {
    // recuperar dados do usuário e colocar no state
    this.setState({
      loading: true,
    }, async () => {
      const dataUser = await getUser();

      this.setState({
        dataUser,
        loading: false,
      });
    });
  }

  render() {
    const { dataUser, loading } = this.state;
    const { name, email, description, image } = dataUser;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
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

            <h2>Nome</h2>
            <p>{name}</p>

            <h2>E-mail</h2>
            <p>{email}</p>

            <h2>Descrição</h2>
            <p>{description}</p>
          </div>
        )}
      </div>
    );
  }
}
