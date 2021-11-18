import { Response } from "express";

export const getArticles = (_: any, res: Response) => {
  res.send("works");
};

export const createArticle = (_: any, res: Response) => {
  res.send("created");
};
