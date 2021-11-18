import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from "./styles";
import { createArticle } from "../../actions/articles";

interface FormProps {}

export const Form: React.FC<FormProps> = ({}) => {
  const classes = useStyles();
  const [articleData, setArticleData] = useState({
    author: "",
    title: "",
    url: "",
    message: "",
    tags: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createArticle(articleData));
  };

  const clear = () => {};

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Add a sightful resource</Typography>
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          fullWidth
          value={articleData.author}
          onChange={(e) =>
            setArticleData({ ...articleData, author: e.target.value })
          }
        ></TextField>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={articleData.title}
          onChange={(e) =>
            setArticleData({ ...articleData, title: e.target.value })
          }
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={articleData.message}
          onChange={(e) =>
            setArticleData({ ...articleData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="url"
          variant="outlined"
          label="Website Url"
          fullWidth
          value={articleData.url}
          onChange={(e) =>
            setArticleData({ ...articleData, url: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={articleData.tags}
          onChange={(e) =>
            setArticleData({ ...articleData, tags: e.target.value })
          }
        ></TextField>
        <Button
          className={classes.buttonSubmit}
          variant="outlined"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};