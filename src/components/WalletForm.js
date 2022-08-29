import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoinsName, expenseRegister } from '../redux/actions';
import coinApiStatus from '../services/coinApiStatus';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      moeda: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinsName());
  }

  inputHandler = ((event) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'select' ? 'selected' : 'value';
    this.setState({
      [name]: target[value],
    });
  });

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id, value, description, moeda, method, tag } = this.state;
    const { dispatch } = this.props;
    const exchangeRates = await coinApiStatus();
    const valorNominal = value * exchangeRates[moeda].ask;
    const objExpense = {
      id,
      value,
      description,
      currency: moeda,
      method,
      tag,
      exchangeRates,
    };
    this.setState({ id: id + 1 });
    this.setState({ value: '', description: '' });
    dispatch(expenseRegister(objExpense, valorNominal));
  };

  render() {
    const { value, description, method } = this.state;
    const { coins, editor } = this.props;
    const moedasNames = coins.map((moeda) => (
      <option
        key={ moeda }
        value={ moeda }
      >
        {moeda}
      </option>
    ));
    let button = '';
    if (editor === true) {
      button = (
        <button
          type="submit"
        >
          Editar despesa
        </button>
      );
    } else {
      button = (
        <button
          type="submit"
        >
          Adicionar Despesa
        </button>);
    }

    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="number"
          name="value"
          id="value"
          value={ value }
          onChange={ this.inputHandler }
          data-testid="value-input"
          placeholder="Valor"
        />
        <input
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ this.inputHandler }
          data-testid="description-input"
          placeholder="Descrição"
        />
        <select
          name="moeda"
          data-testid="currency-input"
          onChange={ this.inputHandler }
        >
          {moedasNames}
        </select>
        <select
          name="method"
          selected={ method }
          data-testid="method-input"
          onChange={ this.inputHandler }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          onChange={ this.inputHandler }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        {button}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  editor: state.wallet.editor });

WalletForm.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
