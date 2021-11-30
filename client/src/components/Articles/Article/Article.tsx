import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { Link } from "@mui/material";

import { deleteArticle } from "../../../actions/articles";
import RatingStars from "../../RatingStars/RatingStars";

export const Article = ({ article, setCurrentId }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("sessionId") as string);

  const {
    name,
    title,
    message,
    url,
    tags,
    totalReviewsCount,
    averageRate,
    createdAt,
  } = article;

  return (
    <Card className={classes.card}>
      <div className={classes.header} />
      <div className={classes.overlay}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">
          {formatDistanceToNow(parseISO(createdAt), {
            addSuffix: true,
          })}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === article?.author ||
          user?.result?._id === article?.author) && (
          <Button
            style={{ color: "#fff" }}
            size="small"
            onClick={() => setCurrentId(article._id)}
          >
            <MoreHorizIcon />
          </Button>
        )}
        <Button style={{ color: "#fff" }} size="small" onClick={() => {}}>
          <VisibilityIcon />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.tags}
        >
          {tags.map((tag: string) => `#${tag} `)}
        </Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          <Link href={`https:${url}`} target="_blank" rel="noreferrer">
            {title}
          </Link>
        </Typography>
        <Typography
          className={classes.details}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.ratingStars}>
          <RatingStars
            articleId={article._id}
            totalReviewsCount={totalReviewsCount}
            averageRate={averageRate}
          />
        </div>
        {(user?.result?.googleId === article?.author ||
          user?.result?._id === article?.author) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deleteArticle(article._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
