import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteExpenseAction, editExpenseAction } from '../redux/actions';

class Table extends Component {
  editExpense = ({ target: { id } }) => {
    const { dispatch } = this.props;
    dispatch(editExpenseAction(parseInt(id, 10)));
  };

  deleteExpense = ({ target: { id, value } }) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenseAction(id, value));
  };

  render() {
    const { expenses } = this.props;
    const expenseList = expenses.map((expense) => {
      const { id, description, tag, method, value, exchangeRates, currency } = expense;
      const apiCoinData = exchangeRates[currency];
      const { name, ask } = apiCoinData;
      const convertedValue = ask * value;
      return (
        <tr key={ id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{parseFloat(value).toFixed(2)}</td>
          <td>{name}</td>
          <td>{parseFloat(ask).toFixed(2)}</td>
          <td>{convertedValue.toFixed(2)}</td>
          <td>Real</td>
          <td>
            <button
              id={ id }
              type="button"
              data-testid="edit-btn"
              onClick={ this.editExpense }
            >
              Editar
            </button>
            <button
              id={ id }
              value={ parseFloat(value) * parseFloat(ask) }
              type="button"
              data-testid="delete-btn"
              onClick={ this.deleteExpense }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenseList}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses });

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
