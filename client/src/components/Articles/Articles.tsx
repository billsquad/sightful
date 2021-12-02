import { Grid, CircularProgress } from "@material-ui/core";

import { Article } from "./Article/Article";
import useStyles from "./styles";
import { Dispatch, SetStateAction } from "react";
import { ArticleProps } from "./Article/interface";
import { RootState } from "../../store";
import { useAppSelector } from "../../custom.hooks";
import { ArticleState } from "./interface";

export const Articles: React.FC<{
  setCurrentId: Dispatch<SetStateAction<null>>;
}> = ({ setCurrentId }) => {
  const { articles, isLoading } = useAppSelector(
    (state: RootState) => state.articleReducer
  ) as ArticleState;
  const classes = useStyles();

  if (!articles?.length && !isLoading) {
    return <h1>No articles found.</h1>;
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {(articles as []).map((article: ArticleProps) => (
        <Grid key={article._id} item xs={12} sm={12} md={6} lg={6}>
          <Article article={article} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
