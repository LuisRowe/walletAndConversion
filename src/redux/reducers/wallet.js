import {
  DELETE_EXPENSE, EDIT_EXPENSE, RECEIVE_COINS_NAMES, RECEIVE_EXPENSE, REQUEST_COINS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalValue: 0,
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
      totalValue: state.totalValue + action.valorNominal,
      editor: false,
    });
  case DELETE_EXPENSE:
    return ({ ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== parseInt(action.id, 10),
      ),
      totalValue:
        state.totalValue.toFixed(2) - parseFloat(action.BRLValue).toFixed(2),
    });
  case EDIT_EXPENSE:
    return ({ ...state,
      editor: true,
    });
  default:
    return state;
  }
}

export default wallet;
