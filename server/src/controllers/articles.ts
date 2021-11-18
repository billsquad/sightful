import { Request, Response } from "express";
import Article from "../models/Article";

export const getArticles = async (_: any, res: Response) => {
  try {
    const articles = await Article.find();

    res.status(200).json(articles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  const article = req.body;
  const newArticle = new Article(article);

  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
