export default (articles = [], action: { type: any; payload: any }) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...articles, action.payload];
    case "UPDATE":
      return articles.map((article: any) =>
        article._id === action.payload._id ? action.payload : article
      );
    default:
      return articles;
  }
};
