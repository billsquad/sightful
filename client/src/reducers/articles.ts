export default (articles = [], action: { type: any }) => {
  switch (action.type) {
    case "FETCH_ALL":
      return articles;
    case "CREATE":
      return articles;
    default:
      return articles;
  }
};
