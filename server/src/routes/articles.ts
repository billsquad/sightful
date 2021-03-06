import express from "express";
import {
  getArticles,
  getArticle,
  getArticlesBySearch,
  createArticle,
  updateArticle,
  deleteArticle,
  rateArticle,
} from "../controllers/articles";
import auth from "../middleware/auth";

const router = express.Router();

// ORDER REALLY MATTERS!
router.get("/search", getArticlesBySearch);
router.get("/", getArticles);
router.get("/:id", getArticle);

router.post("/", auth, createArticle);
router.patch("/:id", auth, updateArticle);
router.delete("/:id", auth, deleteArticle);
router.patch("/:id/rate", auth, rateArticle);

export default router;
