import fetchCurrencies from '../../utils/fetchCurrencies';
import { FAILED_REQUEST, GET_CURRENCIES } from '../types/currencyType';

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});
export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  try {
    const data = await fetchCurrencies();
    const currencyArray = Object.keys(data);
    const currencyArrayFiltered = currencyArray.filter((currency) => currency !== 'USDT');
    dispatch(getCurrencies(currencyArrayFiltered));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};
