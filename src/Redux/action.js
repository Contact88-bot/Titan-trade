import {
  SET_WALLET,
  SET_TOKEN,
  USER_DETAILS,
  LOGOUT,
  SET_ADUSER,
} from "./actionTypes";

export const setWalet = (wallet) => ({
  type: SET_WALLET,
  payload: wallet,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const setUserDetails = (details) => ({
  type: USER_DETAILS,
  payload: details,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setAdUser = (user) => ({
  type: SET_ADUSER,
  payload: user,
});
