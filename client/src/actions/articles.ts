import * as api from "../api";

// Action creators
export const getArticles = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchArticles();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createArticle = (article: any) => async (dispatch: any) => {
  try {
    const { data } = await api.addArticle(article);

    dispatch({ type: "CREATE", payload: data });
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateArticle =
  (id: string, article: any) => async (dispatch: any) => {
    try {
      const { data } = await api.changeArticle(id, article);

      dispatch({ type: "UPDATE", payload: data });
    } catch (error: any) {
      console.error(error.message);
    }
  };

export const deleteArticle = (id: string) => async (dispatch: any) => {
  try {
    await api.removeArticle(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error: any) {
    console.error(error.message);
  }
};
