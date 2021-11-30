import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";

import useStyles from "./styles";
import { createArticle, updateArticle } from "../../actions/articles";
import { ArticleProps } from "../Articles/Article/interface";
import { RootState } from "../../store";
import { useAppSelector } from "../../custom.hooks";
import { useDispatch } from "react-redux";

interface FormProps {
  currentId: string | null;
  setCurrentId: Dispatch<SetStateAction<null>>;
}

export const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [articleData, setArticleData] = useState<ArticleProps>({
    title: "",
    url: "",
    message: "",
    tags: [""],
  });
  const article = useAppSelector((state: RootState) =>
    currentId
      ? state.articleReducer.find((a: any) => a._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("sessionId") as string);

  useEffect(() => {
    if (article) {
      setArticleData(article);
    }
  }, [article]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updateArticle(currentId, { ...articleData, name: user?.result?.name })
      );
    } else {
      dispatch(createArticle({ ...articleData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setArticleData({ title: "", url: "", message: "", tags: [""] });
  };

  if (!user?.result?.name && !user?.result?.username) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Sign in to add a resource or review articles
        </Typography>
      </Paper>
    );
  }

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
            setArticleData({ ...articleData, tags: e.target.value.split(",") })
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
