import axios from "axios";

const url = "http://localhost:5000/articles";

const fetchArticles = () => axios.get(url);
