import coinsApiName from '../../services/coinApiName';

export const LOGIN = 'LOGIN';
export const REQUEST_COINS = 'REQUEST_COINS';
export const RECEIVE_COINS_NAMES = 'RECEIVE_COINS';

export const login = (email) => ({ type: LOGIN, email });

const requestCoins = () => ({
  type: REQUEST_COINS });

// outro action creator que retorna um objeto, que você tem feito até então
const receiveCoins = (coins) => ({
  type: RECEIVE_COINS_NAMES,
  coins });

// action creator que retorna uma função, possível por conta do pacote redux-thunk
export function fetchCoins() {
  return async (dispatch) => { // thunk declarado
    dispatch(requestCoins());
    const coins = await coinsApiName();
    console.log(coins);
    dispatch(receiveCoins(coins));
  };
}
