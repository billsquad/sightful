import * as actionType from "../constants/actionTypes";

export default (state = [], action: { type: any; data: any }) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("sessionId", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};
