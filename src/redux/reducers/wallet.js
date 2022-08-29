import {
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_REGISTER,
  RECEIVE_COINS_NAMES,
  RECEIVE_EXPENSE,
  REQUEST_COINS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalValue: 0,
  currencyEditing: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_COINS:
    return ({ ...state });
  case RECEIVE_COINS_NAMES:
    return ({ ...state,
      currencies: action.coins });
  case RECEIVE_EXPENSE:
    return ({ ...state,
      expenses: [...state.expenses, action.expense],
      totalValue: Math.round(((state.totalValue) + (action.valorNominal))
        * 100) / 100,
      editor: false,
    });
  case DELETE_EXPENSE:
    return ({ ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== parseInt(action.id, 10),
      ),
      totalValue:
        (Math.round(state.totalValue * 100) - Math.round(action.BRLValue * 100)) / 100,
    });
  case EDIT_EXPENSE:
    return ({ ...state,
      editor: true,
      idToEdit: action.id,
      currencyEditing: state.expenses
        .find((expense) => expense.id === action.id).currency });
  case EDIT_REGISTER:
    return ({ ...state,
      totalValue: (action.value
        * state.expenses
          .find((expense) => expense.id === action.expenseEdited.id)
          .exchangeRates[action.currency].ask)
      - ((state.expenses
        .find(({ id }) => id === action.expenseEdited.id).value)
      * state.expenses
        .find((expense) => expense.id === action.expenseEdited.id)
        .exchangeRates[state.currencyEditing].ask)
        + state.totalValue,
      editor: false,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expenseEdited.id) {
          return { ...expense,
            ...action.expenseEdited };
        } return expense;
      }),
    });
  default:
    return state;
  }
}

// console.log((action.value * state.expenses
//   .find((expense) => expense.id === action.expenseEdited.id)
//   .exchangeRates[action.currency].ask).toFixed(2));
// console.log((state.expenses.find(({ id }) => id === action.expenseEdited.id).value
//  * state.expenses
//    .find((expense) => expense.id === action.expenseEdited.id)
//    .exchangeRates[action.currency].ask).toFixed(2));

export default wallet;

// totalValue: (state.totalValue * 100
//   + ((action.value * 100) * state.expenses
//     .find((expense) => expense.id === action.expenseEdited.id)
//     .exchangeRates[action.currency].ask)
// - ((parseFloat(state.expenses
//   .find(({ id }) => id === action.expenseEdited.id).value) * 100)
//   * state.expenses
//     .find((expense) => expense.id === action.expenseEdited.id)
//     .exchangeRates[action.currency].ask)) / 100,
