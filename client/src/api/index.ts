import axios from "axios";

const url = "http://localhost:5000/articles";

export const fetchArticles = () => axios.get(url);
export const addArticle = (newArticle: any) => axios.post(url, newArticle);
