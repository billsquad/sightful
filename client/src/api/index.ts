import axios from "axios";

const url = "http://localhost:5000/articles";

export const fetchArticles = () => axios.get(url);
export const addArticle = (newArticle: any) => axios.post(url, newArticle);
export const changeArticle = (id: string, updatedArticle: any) =>
  axios.patch(`${url}/${id}`, updatedArticle);
export const removeArticle = (id: string) => axios.delete(`${url}/${id}`);
