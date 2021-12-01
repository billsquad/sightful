import { Grid, CircularProgress } from "@material-ui/core";

import { Article } from "./Article/Article";
import useStyles from "./styles";
import { Dispatch, SetStateAction } from "react";
import { ArticleProps } from "./Article/interface";
import { RootState } from "../../store";
import { useAppSelector } from "../../custom.hooks";

export const Articles: React.FC<{
  setCurrentId: Dispatch<SetStateAction<null>>;
}> = ({ setCurrentId }) => {
  const articles = useAppSelector(
    (state: RootState) => state.articleReducer
  ) as [] | { message: string };
  const classes = useStyles();

  if ((articles as { message: string })?.message) {
    return <h1>{(articles as { message: string }).message}</h1>;
  }

  return !(articles as []).length ? (
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
