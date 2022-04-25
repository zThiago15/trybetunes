import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: /^[a-z]+@[a-z]+\.[com]{2,}$/g,
      description: '',
      image: '',
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    const userData = await getUser();
    const { name, email, description, image } = userData;
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  updateUser = async (event) => {
    event.preventDefault();
    const { name, description, email, image } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    });

    const userUpdated = {
      name,
      email,
      image,
      description,
    };
    await updateUser(userUpdated);

    this.setState({
      loading: false,
    });

    history.push('/profile');
  }

  render() {
    const { loading, name, email, description, image } = this.state;

    const validationForm = !name.length || !email.length
    || !description.length || !image.length;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="name">
              Nome:
              <input
                data-testid="edit-input-name"
                onChange={ this.handleChange }
                name="name"
                value={ name }
              />
            </label>

            <label htmlFor="email">
              E-mail:
              <input
                data-testid="edit-input-email"
                onChange={ this.handleChange }
                name="email"
                value={ email }
              />
            </label>

            <label htmlFor="description">
              Descrição:
              <input
                data-testid="edit-input-description"
                onChange={ this.handleChange }
                name="description"
                value={ description }
              />
            </label>

            <label htmlFor="image">
              Imagem:
              <input
                data-testid="edit-input-image"
                onChange={ this.handleChange }
                name="image"
                value={ image }
              />
            </label>

            <button
              data-testid="edit-button-save"
              type="submit"
              disabled={ validationForm }
              onClick={ this.updateUser }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;
