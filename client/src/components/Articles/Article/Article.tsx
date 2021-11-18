import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarRateIcon from "@mui/icons-material/StarRate";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { Link } from "@mui/material";

import { deleteArticle, rateArticle } from "../../../actions/articles";

export const Article = ({ article, setCurrentId }: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { author, title, message, url, tags, starCount, createdAt } = article;

  return (
    <Card className={classes.card}>
      <div className={classes.header} />
      <div className={classes.overlay}>
        <Typography variant="h6">{author}</Typography>
        <Typography variant="body2">
          {formatDistanceToNow(parseISO(createdAt), {
            addSuffix: true,
          })}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "#fff" }}
          size="small"
          onClick={() => setCurrentId(article._id)}
        >
          <MoreHorizIcon />
        </Button>
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
          {tags.map((tag: string) => `#${tag}`)}
        </Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          <Link href={url}>{title}</Link>
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
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(rateArticle(article._id))}
        >
          {starCount > 1 ? (
            <StarRateIcon fontSize="small" />
          ) : (
            <StarBorderIcon fontSize="small" />
          )}
          Rate
          <span style={{ marginLeft: "5px" }}>{starCount}</span>
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteArticle(article._id))}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
