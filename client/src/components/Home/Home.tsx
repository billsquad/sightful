import { Container, Grow, Grid, Paper } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "wouter";
import { getArticlesBySearch } from "../../actions/articles";
import { Articles } from "../Articles/Articles";
import { Form } from "../Form/Form";
import Pagination from "../CustomPagination/CustomPagination";
import { useSearchQuery } from "../../hooks/hooks";

import useStyles from "./styles";
import { SearchBar } from "../SearchBar/SearchBar";

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
            {/* TODO: Sticky form position doesn't work */}
            <div style={{ position: "sticky", top: "0" }}>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleKeyPress={handleKeyPress}
                tags={tags}
                handleAddTag={handleAddTag}
                handleDeleteTag={handleDeleteTag}
                searchArticle={searchArticle}
              />
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {!searchQuery && !tags.length && (
                <Paper elevation={6} className={classes.pagination}>
                  <div>
                    <Pagination page={page as number} />
                  </div>
                </Paper>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
