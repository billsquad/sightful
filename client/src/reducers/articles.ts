import * as actionType from "../constants/actionTypes";

export default (articles = [], action: { type: any; payload: any }) => {
  switch (action.type) {
    case actionType.FETCH_ALL:
      return action.payload;
    case actionType.FETCH_BY_SEARCH:
      return action.payload;
    case actionType.CREATE:
      return [...articles, action.payload];
    case actionType.UPDATE:
      return articles.map((article: any) =>
        article._id === action.payload._id ? action.payload : article
      );
    case actionType.DELETE:
      return articles.filter((article: any) => article._id !== action.payload);
    default:
      return articles;
  }
};
