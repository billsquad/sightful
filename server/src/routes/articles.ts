import express from "express";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articles";

const router = express.Router();

router.get("/", getArticles);
router.post("/", createArticle);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
