import express from "express";
import {
  getArticles,
  createArticle,
  updateArticle,
} from "../controllers/articles";

const router = express.Router();

router.get("/", getArticles);
router.post("/", createArticle);
router.patch("/:id", updateArticle);

export default router;
