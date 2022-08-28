import { RECEIVE_COINS_NAMES, REQUEST_COINS } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_COINS:
    return ({ ...state });
  case RECEIVE_COINS_NAMES:
    return ({ ...state,
      currencies: action.coins });
  default:
    return state;
  }
}

export default wallet;
