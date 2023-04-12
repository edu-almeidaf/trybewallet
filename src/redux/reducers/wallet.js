import { GET_CURRENCIES } from '../types/currencyType';
import {
  EXPENSE_REQUEST,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDITED_EXPENSE,
} from '../types/expenseType';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

let nextId = 0;

const incrementId = (payload) => {
  const newPayload = { ...payload, id: nextId };
  nextId += 1;
  return newPayload;
};

const editTask = (expenses, payload) => expenses.map((task) => {
  if (task.id === payload.id) {
    return {
      ...task,
      ...payload.expense,
    };
  }
  return task;
});

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: payload,
    };

  case EXPENSE_REQUEST:
    return {
      ...state,
      expenses: [...state.expenses, incrementId(payload)],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: payload,
    };

  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      expenses: editTask(state.expenses, payload),
      editor: false,
    };

  default:
    return state;
  }
};

export default walletReducer;
