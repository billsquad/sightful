import React from "react";
import useStyles from "./styles";

interface ArticleProps {}

export const Article: React.FC<ArticleProps> = ({}) => {
  const classes = useStyles();

  return <div>ARTICLE</div>;
};
