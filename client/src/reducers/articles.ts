import * as actionType from "../constants/actionTypes";

export default (
  state = { isLoading: true, articles: [] },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case actionType.START_LOADING:
      return { ...state, isLoading: true };
    case actionType.END_LOADING:
      return { ...state, isLoading: false };
    case actionType.FETCH_ALL:
      return {
        ...state,
        articles: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case actionType.FETCH_BY_SEARCH:
      return { ...state, articles: action.payload.data };
    case actionType.CREATE:
      return { ...state, articles: [...state.articles, action.payload] };
    case actionType.UPDATE:
      return {
        ...state,
        articles: state.articles.map((article: any) =>
          article._id === action.payload._id ? action.payload : article
        ),
      };
    case actionType.DELETE:
      return {
        ...state,
        articles: state.articles.filter(
          (article: any) => article._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
