import express from "express";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  rateArticle,
} from "../controllers/articles";

const router = express.Router();

router.get("/", getArticles);
router.post("/", createArticle);
router.patch("/:id", updateArticle);
router.delete("/:id", deleteArticle);
router.patch("/:id/rate", rateArticle);

export default router;
