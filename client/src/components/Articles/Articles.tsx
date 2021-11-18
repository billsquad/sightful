import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import { Article } from "./Article/Article";
import useStyles from "./styles";

interface ArticleProps {
  _id?: string;
  author: string;
  title: string;
  message: string;
  url: string;
  tags: string[];
  likeCount: number;
  createdAt: Date;
}

export const Articles: React.FC<{}> = () => {
  const articles = useSelector((state) => state) as [];
  const classes = useStyles();

  return !postMessage.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {articles.map((article: ArticleProps) => (
        <Grid key={article._id} item xs={12}>
          <Article article={article} />
        </Grid>
      ))}
    </Grid>
  );
};