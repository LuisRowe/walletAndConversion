import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCoinsName, expenseRegister, editRegister } from '../redux/actions';
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
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  });

  handleSubmitEdit = async (event) => {
    event.preventDefault();
    const { value, description, moeda, method, tag } = this.state;
    const { dispatch, idToEdit } = this.props;
    const objExpense = {
      id: idToEdit,
      value,
      description,
      currency: moeda,
      method,
      tag,
    };
    dispatch(editRegister(objExpense, value, moeda));
  };

  handleSubmitAdd = async (event) => {
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
          className="btn btn-primary"
          type="submit"
          onClick={ this.handleSubmitEdit }
        >
          Editar despesa
        </button>
      );
    } else {
      button = (
        <button
          className="btn btn-success"
          type="submit"
          onClick={ this.handleSubmitAdd }
        >
          Adicionar Despesa
        </button>);
    }

    return (
      <form className="row g-3 expense-form">
        <div className="col-md-2">
          <label className="form-label" htmlFor="value">
            Valor
            <input
              className="form-control"
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.inputHandler }
              data-testid="value-input"
              placeholder="Valor"
            />
          </label>
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor="description">
            Descrição
            <input
              className="form-control"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.inputHandler }
              data-testid="description-input"
              placeholder="Descrição"
            />
          </label>
        </div>
        <div className="col-md-1">
          <label htmlFor="moeda" className="form-label">
            Moeda
            <select
              className="form-select"
              name="moeda"
              id="moeda"
              data-testid="currency-input"
              onChange={ this.inputHandler }
            >
              {moedasNames}
            </select>
          </label>
        </div>
        <div className="col-md-3">
          <label className="form-label" htmlFor="method">
            Método de Pagamento
            <select
              className="form-select"
              name="method"
              id="method"
              selected={ method }
              data-testid="method-input"
              onChange={ this.inputHandler }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
        </div>
        <div className="col-md-2">
          <label className="form-label" htmlFor="tag">
            Tag
            <select
              className="form-select"
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.inputHandler }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </div>
        <div className="col-12">
          {button}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit });

WalletForm.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
