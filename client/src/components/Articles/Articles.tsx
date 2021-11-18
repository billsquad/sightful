import React from "react";
import { Article } from "./Article/Article";
import useStyles from "./styles";

interface ArticlesProps {}

export const Articles: React.FC<ArticlesProps> = ({}) => {
  const classes = useStyles();

  return (
    <>
      <h1>ARTICLES</h1>
      <Article />
      <Article />
    </>
  );
};
