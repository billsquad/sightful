import { Request, Response } from "express";
import UserRequest from "../custom";
import mongoose from "mongoose";
import Article from "../models/Article";
import { countAverageRateFromReviews } from "../utils/calculateAverageRateFromReviews";

export const getArticles = async (req: Request, res: Response) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT; // the staring index of every page
    const total = await Article.countDocuments({});

    const articles = await Article.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: articles,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getArticlesBySearch = async (req: Request, res: Response) => {
  const { query, tags } = req.query;

  try {
    const title = new RegExp(query as string, "i");

    const articles = await Article.find({
      $or: [{ title }, { tags: { $in: (tags as string)?.split(",") } }],
    });

    res.json({ data: articles });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createArticle = async (req: UserRequest, res: Response) => {
  const article = req.body;
  const newArticle = new Article({
    ...article,
    author: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateArticle = async (req: UserRequest, res: Response) => {
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

export const deleteArticle = async (req: UserRequest, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No posts found with provided id.");
  }

  await Article.findByIdAndRemove(id);

  return res.json({ message: "Successfully deleted article." });
};

export const rateArticle = async (req: UserRequest, res: Response) => {
  const { id } = req.params;
  const { stars } = req.query;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated." });
  }

  const article = await Article.findById(id);

  const userIndex = article.reviewedBy.findIndex(
    (id: string) => id === String(req.userId)
  );

  if (userIndex === -1) {
    article.reviewedBy.push(req.userId);
    article.totalRates.push(stars);
    article.averageRate = countAverageRateFromReviews(article.totalRates);
    article.totalReviewsCount = article.totalRates.length;
  } else {
    article.totalRates.pop();
    article.totalRates.push(stars);
    article.averageRate = countAverageRateFromReviews(article.totalRates);
    article.totalReviewsCount = article.totalRates.length;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No posts found with provided id.");
  }

  const updatedArticle = await Article.findByIdAndUpdate(id, article, {
    new: true,
  });

  return res.json(updatedArticle);
};
