import { useSelector } from "react-redux";

import { Article } from "./Article/Article";
import useStyles from "./styles";

interface ArticlesProps {
  title: string;
  message: string;
  create: string;
  tags: string[];
  likeCount: number;
  createdAt: Date;
}

export const Articles: React.FC<{}> = ({}) => {
  const articles = useSelector((state) => state);
  const classes = useStyles();

  return (
    <>
      <h1>ARTICLES</h1>
      <Article />
      <Article />
    </>
  );
};
