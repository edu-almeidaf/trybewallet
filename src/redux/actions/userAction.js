import { LOGIN } from '../types/userType';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});
