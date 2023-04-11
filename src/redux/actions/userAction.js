import { LOGIN } from '../Types/userType';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});
