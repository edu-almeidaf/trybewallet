import { GET_CURRENCIES } from '../types/currencyType';
import { EXPENSE_REQUEST } from '../types/expenseType';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

let nextId = 0;

const incrementId = (payload) => {
  const newPayload = { ...payload, id: nextId };
  nextId += 1;
  return newPayload;
};

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
  default:
    return state;
  }
};

export default walletReducer;
