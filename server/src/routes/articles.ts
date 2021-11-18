import express from "express";
import { getArticles, createArticle } from "../controllers/articles";

const router = express.Router();

router.get("/", getArticles);
router.post("/", createArticle);

export default router;
