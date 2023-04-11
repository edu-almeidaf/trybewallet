import { LOGIN } from '../Types/userType';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOGIN:
    return {
      ...state,
      email: payload.email,
    };
  default:
    return state;
  }
};

export default userReducer;
