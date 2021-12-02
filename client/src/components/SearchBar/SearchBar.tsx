import React from "react";
import ChipInput from "material-ui-chip-input";
import { AppBar, TextField, Button } from "@material-ui/core";

import useStyles from "./styles";

interface SearchBarProps {
  searchTerm: string;
  tags: string[];
  setSearchTerm: (e: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  handleAddTag: (tag: string) => void;
  handleDeleteTag: (tagToDelete: string) => void;
  searchArticle: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  tags,
  setSearchTerm,
  handleKeyPress,
  handleAddTag,
  handleDeleteTag,
  searchArticle,
}) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.searchBar} position="static" color="inherit">
      <TextField
        name="search"
        variant="outlined"
        label="Search through articles"
        fullWidth
        value={searchTerm}
        onKeyPress={handleKeyPress}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ChipInput
        style={{ margin: "10px 0" }}
        value={tags}
        onAdd={handleAddTag}
        onDelete={handleDeleteTag}
        label="Search tags"
        variant="outlined"
      />
      <Button onClick={searchArticle} color="primary" variant="outlined">
        Search
      </Button>
    </AppBar>
  );
};
