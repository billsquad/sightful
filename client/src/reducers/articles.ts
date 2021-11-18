export default (articles = [], action: { type: any; payload: any }) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...articles, action.payload];
    default:
      return articles;
  }
};
