import express from "express";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  rateArticle,
} from "../controllers/articles";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", getArticles);
router.post("/", auth, createArticle);
router.patch("/:id", auth, updateArticle);
router.delete("/:id", auth, deleteArticle);
router.patch("/:id/rate", auth, rateArticle);

export default router;
