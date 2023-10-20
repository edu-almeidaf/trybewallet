import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GiWallet } from 'react-icons/gi';
import { login } from '../redux/actions/userAction';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { history, dispatch } = this.props;

    dispatch(login({ email }));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const passWordLength = 6;
    const isValidEmail = email.includes('@') && email.toLowerCase().includes('.com');
    const isValidPassword = password.length >= passWordLength;
    return (
      <section className="page-login">
        <div className="container-login">
          <div className="login-title-container">
            <GiWallet className="login-icon" />
            <h1>
              Trybe
              {' '}
              <span>Wallet</span>
            </h1>
          </div>

          <form className="form-login">
            <div className="input-container">
              <input
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                data-testid="email-input"
                placeholder="Email"
              />

              <input
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleChange }
                data-testid="password-input"
                placeholder="Senha"
              />
            </div>

            <button
              type="submit"
              disabled={ !isValidEmail || !isValidPassword }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>

        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func.isRequired,
}.isRequired;

export default connect()(Login);
