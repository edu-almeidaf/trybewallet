import fetchCurrencies from '../../utils/fetchCurrencies';
import { GET_CURRENCIES } from '../types/currencyType';

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  const data = await fetchCurrencies();
  const currencyArray = Object.keys(data);
  const currencyArrayFiltered = currencyArray.filter((currency) => currency !== 'USDT');
  dispatch(getCurrencies(currencyArrayFiltered));
};
