import * as actionType from "../constants/actionTypes";

export default (state = [], action: { type: any; payload: any }) => {
  switch (action.type) {
    case actionType.FETCH_ALL:
      return {
        ...state,
        articles: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case actionType.FETCH_BY_SEARCH:
      return { ...state, articles: action.payload };
    case actionType.CREATE:
      return [...state, action.payload];
    case actionType.UPDATE:
      return state.map((article: any) =>
        article._id === action.payload._id ? action.payload : article
      );
    case actionType.DELETE:
      return state.filter((article: any) => article._id !== action.payload);
    default:
      return state;
  }
};
