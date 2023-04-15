import {
  EXPENSE_REQUEST,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDITED_EXPENSE,
  SET_ASK_TO_FALSE,
} from '../types/expenseType';
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

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const saveEditedExpense = (expense, id) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: {
    expense,
    id,
  },
});

export const setAskToFalse = () => ({
  type: SET_ASK_TO_FALSE,
});
