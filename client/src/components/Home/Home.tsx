import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { getArticlesBySearch } from "../../actions/articles";
import { Articles } from "../Articles/Articles";
import { Form } from "../Form/Form";
import Pagination from "../CustomPagination/CustomPagination";
import { useSearchQuery } from "../../hooks/hooks";
import ChipInput from "material-ui-chip-input";

import useStyles from "./styles";

export const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [location, setLocation] = useLocation();
  const query = useSearchQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const searchArticle = () => {
    if (searchTerm.trim() || tags.length) {
      dispatch(
        getArticlesBySearch({ searchTerm, tags: (tags as string[]).join(",") })
      );

      setLocation(
        `/articles/search?query=${searchTerm || "none"}&tags=${(
          tags as string[]
        ).join(",")}`
      );
    } else {
      setLocation("/");
    }
  };

  const hangleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      searchArticle();
    }
  };

  const handleAddTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((tags as string[]).filter((tag) => tag !== tagToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={8}>
            <Articles setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppBar
              className={classes.searchBar}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search through articles"
                fullWidth
                value={searchTerm}
                onKeyPress={hangleKeyPress}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags as string[]}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
                label="Search tags"
                variant="outlined"
              />
              <Button
                onClick={searchArticle}
                color="primary"
                variant="outlined"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6}>
                <div>
                  <Pagination page={page as number} />
                </div>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
