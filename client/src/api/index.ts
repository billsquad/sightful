import axios from "axios";

// **PROD**
// const API = axios.create({ baseURL: "https://sightful-server.herokuapp.com" });

// **DEVELOPMENT**
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("sessionId")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("sessionId") as string).token
    }`;
  }

  return req;
});

export const fetchArticles = () => API.get("/articles");
export const addArticle = (newArticle: any) =>
  API.post("/articles", newArticle);
export const changeArticle = (id: string, updatedArticle: any) =>
  API.patch(`/articles/${id}`, updatedArticle);
export const removeArticle = (id: string) => API.delete(`/articles/${id}`);
export const rateArticle = (id: string, rate: number | null) =>
  API.patch(`/articles/${id}/rate?stars=${rate}`);

export const signIn = (formData: any) => API.post("/users/signin", formData);
export const signUp = (formData: any) => API.post("/users/signup", formData);
