import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from "./styles";
import { createArticle, updateArticle } from "../../actions/articles";

interface FormProps {
  currentId: string | null;
  setCurrentId: Dispatch<SetStateAction<null>>;
}

export const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [articleData, setArticleData] = useState({
    author: "",
    title: "",
    url: "",
    message: "",
    tags: "",
  });
  const article = useSelector((state: any) =>
    currentId ? state.find((a: any) => a._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (article) {
      setArticleData(article);
    }
  }, [article]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateArticle(currentId, articleData));
    } else {
      dispatch(createArticle(articleData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setArticleData({ author: "", title: "", url: "", message: "", tags: "" });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Update" : "Add"} a resource
        </Typography>
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
          color="primary"
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
