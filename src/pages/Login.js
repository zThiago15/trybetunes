import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  submitData(event) {
    event.preventDefault();
    const { name } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      history.push('/search');
    });
  }

  render() {
    const { name, loading } = this.state;
    const minLength = 3;

    return (
      <div data-testid="page-login">

        {loading ? <Loading /> : (
          <form onSubmit={ this.submitData }>
            <label htmlFor="name">
              Nome:
              <input
                name="name"
                onChange={ this.handleChange }
                value={ name }
                data-testid="login-name-input"
                minLength="3"
              />
            </label>

            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ name.length < minLength }
            >
              Entrar
            </button>
          </form>
        )}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;
