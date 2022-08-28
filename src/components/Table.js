import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    const expenseList = expenses.map((expense) => {
      const { description, tag, method, value, exchangeRates, currency } = expense;
      const apiCoinData = exchangeRates[currency];
      const { name, ask } = apiCoinData;
      // const nameSplited = name.split('/');
      const convertedValue = ask * value;
      return (
        <tr key={ expense.id }>
          <td>{description}</td>
          <td>{tag}</td>
          <td>{method}</td>
          <td>{parseFloat(value).toFixed(2)}</td>
          <td>{name}</td>
          <td>{parseFloat(ask).toFixed(2)}</td>
          <td>{convertedValue.toFixed(2)}</td>
          <td>Real</td>
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
};

export default connect(mapStateToProps)(Table);
