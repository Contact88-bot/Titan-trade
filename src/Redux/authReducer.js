import { SET_TOKEN, USER_DETAILS, LOGOUT, SET_ADUSER } from "./actionTypes";

const initialState = {
  token: "",
  user_details: {
    email: "",
    name: "",
    pwd: "",
    joined: "",
    accbal: 0,
    phone: 0,
  },
  user: {},
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case USER_DETAILS:
      return { ...state, user_details: { ...action.payload } };
    case SET_ADUSER:
      return { ...state, user: { ...action.payload } };
    case LOGOUT:
      return {
        ...state,
        token: "",
        user_details: {
          email: "",
          name: "",
          pwd: "",
          joined: "",
          accbal: 0,
          phone: 0,
          manual: 0,
          auto: 0,
          real: 0,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
