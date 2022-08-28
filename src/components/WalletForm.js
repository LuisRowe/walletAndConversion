import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoins } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      isDisabled: true,

    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoins());
  }

  inputHandler = (({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.isButtonDisable);
  });

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { value, description, isDisabled } = this.state;
    const { coins } = this.props;
    const moedasNames = coins.map((moeda) => (
      <option
        key={ moeda }
        value={ moeda }
      >
        {moeda}
      </option>
    ));
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          name="value"
          id="value"
          value={ value }
          onChange={ this.inputHandler }
          data-testid="value-input"
        />
        <input
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ this.inputHandler }
          data-testid="description-input"
        />
        <select data-testid="currency-input">
          {moedasNames}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
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

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies });

WalletForm.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
