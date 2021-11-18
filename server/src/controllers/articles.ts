import { Request, Response } from "express";
import mongoose from "mongoose";
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

export const updateArticle = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const article = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No posts found with provided id.");
  }

  const updatedArticle = await Article.findByIdAndUpdate(
    _id,
    { ...article, _id },
    {
      new: true,
    }
  );

  return res.json(updatedArticle);
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No posts found with provided id.");
  }

  await Article.findByIdAndRemove(id);

  return res.json({ message: "Successfully deleted article." });
};

export const rateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No posts found with provided id.");
  }

  const article: any = await Article.findById(id);

  const updatedArticle = await Article.findByIdAndUpdate(
    id,
    {
      starCount: article.starCount + 1,
    },
    { new: true }
  );

  return res.json(updatedArticle);
};
