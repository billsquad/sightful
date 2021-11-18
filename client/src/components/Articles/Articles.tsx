import React from "react";
import { Article } from "./Article/Article";

interface ArticlesProps {}

export const Articles: React.FC<ArticlesProps> = ({}) => {
  return (
    <>
      <h1>ARTICLES</h1>
      <Article />
      <Article />
    </>
  );
};
