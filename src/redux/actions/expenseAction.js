import { EXPENSE_REQUEST } from '../types/expenseType';
import fetchCurrencies from '../../utils/fetchCurrencies';

const expenseRequest = (expenses, data) => ({
  type: EXPENSE_REQUEST,
  payload: {
    ...expenses,
    exchangeRates: data,
  },
});

export const fetchExpenseThunk = (expenses) => async (dispatch) => {
  const data = await fetchCurrencies();
  dispatch(expenseRequest(expenses, data));
};
