import React, { useEffect, useMemo, forwardRef } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "wouter";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../custom.hooks";
import { getArticles } from "../../actions/articles";
import useStyles from "./styles";
import { RootState } from "../../store";

interface CustomPaginationProps {
  page: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useAppSelector(
    (state: RootState) => state.articleReducer
  ) as { numberOfPages: number };

  useEffect(() => {
    if (page) {
      dispatch(getArticles(page));
    }
  }, [page]);

  return (
    <div>
      <Pagination
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/articles?page=${item.page}`}
          />
        )}
      />
    </div>
  );
};

export default CustomPagination;
