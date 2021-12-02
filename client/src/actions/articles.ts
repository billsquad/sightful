import { Dispatch } from "react";
import {
  FETCH_ALL,
  FETCH_ARTICLE,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import * as api from "../api";

// Action creators
export const getArticles =
  (page: number) => async (dispatch: Dispatch<any>) => {
    // TODO: Fix request to articles?page=undefined - remove if (page)
    // console.log(page);

    if (page) {
      try {
        dispatch({ type: START_LOADING });
        const {
          data: { data, currentPage, numberOfPages },
        } = await api.fetchArticles(page);

        dispatch({
          type: FETCH_ALL,
          payload: { data, currentPage, numberOfPages },
        });

        dispatch({ type: END_LOADING });
      } catch (error: any) {
        console.error(error.message);
      }
    }
  };

export const getArticle = (id: string) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: START_LOADING });
  const { data } = await api.fetchArticle(id);

  console.log(data);

  dispatch({ type: FETCH_ARTICLE, payload: { article: data } });
  dispatch({ type: END_LOADING });
};

export const getArticlesBySearch =
  (searchQuery: { searchTerm: string; tags: string }) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: { data },
      } = await api.fetchArticlesBySearch(searchQuery);

      dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
      dispatch({ type: END_LOADING });
    } catch (error: any) {
      console.error(error.message);
    }
  };

export const createArticle =
  (article: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.addArticle(article);

      dispatch({ type: CREATE, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error: any) {
      console.error(error.message);
    }
  };

export const updateArticle =
  (id: string, article: any) => async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.changeArticle(id, article);

      dispatch({ type: UPDATE, payload: data });
    } catch (error: any) {
      console.error(error.message);
    }
  };

export const deleteArticle =
  (id: string) => async (dispatch: Dispatch<any>) => {
    try {
      await api.removeArticle(id);

      dispatch({ type: DELETE, payload: id });
      localStorage.removeItem(`userArticleRate${id}`);
    } catch (error: any) {
      console.error(error.message);
    }
  };

export const rateArticle =
  (id: string, rate: number | null) => async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.rateArticle(id, rate);

      dispatch({ type: UPDATE, payload: data });
    } catch (error: any) {
      console.error(error.message);
    }
  };
