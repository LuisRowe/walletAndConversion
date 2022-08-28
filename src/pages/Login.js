import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  validadeEmail = () => {
    const { email } = this.state;
    const emailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    // validação do email: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    if (email.match(emailValidation)) return true;
  };

  validadePassword = () => {
    const { password } = this.state;
    const minCharacPassword = 6;
    return password.length >= minCharacPassword;
  };

  isButtonDisable = () => {
    if (this.validadeEmail() && this.validadePassword()) {
      this.setState({ isDisabled: false });
    } else { this.setState({ isDisabled: true }); }
  };

  inputHandler = (({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.isButtonDisable);
  });

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history: { push } } = this.props;
    const { email } = this.state;
    dispatch(login(email));
    push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={ email }
          onChange={ this.inputHandler }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Senha"
          value={ password }
          onChange={ this.inputHandler }
          data-testid="password-input"
        />
        <button
          type="submit"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
