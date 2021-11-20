import { Grid, CircularProgress } from "@material-ui/core";

import { Article } from "./Article/Article";
import useStyles from "./styles";
import { Dispatch, SetStateAction } from "react";
import { ArticleProps } from "./Article/interface";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks";

export const Articles: React.FC<{
  setCurrentId: Dispatch<SetStateAction<null>>;
}> = ({ setCurrentId }) => {
  const articles = useAppSelector(
    (state: RootState) => state.articleReducer
  ) as [];
  const classes = useStyles();

  return !articles.length ? (
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
          <Article article={article} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
