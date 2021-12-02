import { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Link,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useRoute, useLocation } from "wouter";
import { useAppSelector } from "../../custom.hooks";

import useStyles from "./styles";
import { RootState } from "../../store";
import { ArticleState } from "./interface";
import { getArticle } from "../../actions/articles";

interface ArticlePageProps {}

export const ArticlePage: React.FC<ArticlePageProps> = ({}) => {
  const classes = useStyles();

  const { article, articles, isLoading } = useAppSelector(
    (state: RootState) => state.articleReducer
  ) as ArticleState;

  const dispatch = useDispatch();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/articles/:id");

  useEffect(() => {
    dispatch(getArticle(params?.id as string));
  }, [params?.id]);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return article ? (
    <Paper className={classes.paper} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            <Link
              href={`https:${article.url}`}
              target="_blank"
              rel="noreferrer"
            >
              {article.title}
            </Link>
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {article.tags.map((tag: string) => `#${tag} `)}
          </Typography>
          <Typography variant="body1" component="p">
            Created by: {article.name}
          </Typography>
          <Typography variant="body1" component="p">
            {formatDistanceToNow(parseISO(article.createdAt), {
              addSuffix: true,
            })}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className={classes.articleMessage}
          >
            {article.message}
          </Typography>
          <Divider color="secondary" style={{ margin: "20px 0" }} />
        </div>
      </div>
    </Paper>
  ) : null;
};
