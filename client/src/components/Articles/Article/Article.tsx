import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatDistanceToNow, parseISO } from "date-fns";

import useStyles from "./styles";
import { Link } from "@mui/material";

export const Article = ({ article }: any) => {
  const classes = useStyles();
  const { author, title, message, url, tags, likeCount, createdAt } = article;

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
        <Button style={{ color: "#fff" }} size="small" onClick={() => {}}>
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
        <Typography className={classes.details} variant="h5" gutterBottom>
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};
