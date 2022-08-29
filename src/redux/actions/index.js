import coinsApiName from '../../services/coinApiName';

export const LOGIN = 'LOGIN';
export const REQUEST_COINS = 'REQUEST_COINS';
export const RECEIVE_COINS_NAMES = 'RECEIVE_COINS';
export const RECEIVE_EXPENSE = 'RECEIVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const login = (email) => ({ type: LOGIN, email });

export const expenseRegister = (expense, valorNominal) => ({
  type: RECEIVE_EXPENSE, expense, valorNominal });

export const deleteExpenseAction = (id, BRLValue) => ({
  type: DELETE_EXPENSE, id, BRLValue });

const requestCoins = () => ({
  type: REQUEST_COINS });

const receiveCoins = (coins) => ({
  type: RECEIVE_COINS_NAMES,
  coins });

export function fetchCoinsName() {
  return async (dispatch) => { // thunk declarado
    dispatch(requestCoins());
    const coins = await coinsApiName();
    dispatch(receiveCoins(coins));
  };
}

// export function fetchCoinsStatus() {
//   return async (dispatch) => { // thunk declarado
//     dispatch(requestCoins());
//     const coins = await coinsApiName();
//     console.log(coins);
//     dispatch(receiveCoins(coins));
//   };
// }
