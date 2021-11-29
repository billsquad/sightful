import { Response } from "express";
import UserRequest from "../custom";
import mongoose from "mongoose";
import Article from "../models/Article";
import { countAverageRateFromReviews } from "../utils/calculateAverageRateFromReviews";

export const getArticles = async (_: any, res: Response) => {
  try {
    const articles = await Article.find();

    res.status(200).json(articles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createArticle = async (req: UserRequest, res: Response) => {
  const article = req.body;
  const newArticle = new Article(article);

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

  // if (!req.userId) {
  //   return res.json({ message: "Unauthenticated." });
  // }

  const article = await Article.findById(id);

  // const userIndex = article.reviewed.findIndex(
  //   (id: string) => id === String(req.userId)
  // );

  // if (userIndex === -1) {
  //   article.reviewed.push(req.userId);
  //   article.totalRates.push(stars);
  // } else {
  //   article.reviewed = article.reviewed.filter(
  //     (id: string) => id !== String(req.userId)
  //   );
  // }

  console.log(stars, article.totalRates);

  article.totalRates.push(stars);
  article.averageRate = countAverageRateFromReviews(article.totalRates);
  article.totalReviewsCount = article.totalRates.length;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No posts found with provided id.");
  }

  const updatedArticle = await Article.findByIdAndUpdate(id, article, {
    new: true,
  });

  return res.json(updatedArticle);
};
