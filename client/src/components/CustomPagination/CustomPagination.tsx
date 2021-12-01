import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link, LinkProps } from "wouter";

import useStyles from "./styles";

const CustomPagination = () => {
  const classes = useStyles();

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link to={`/articles?page=${1}`} {...linkProps} />
      )),
    [`/articles?page=${1}`]
  );

  return (
    <div>
      <Pagination
        classes={{ ul: classes.ul }}
        count={5}
        page={1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem {...item} component={CustomLink} />
        )}
      />
    </div>
  );
};

export default CustomPagination;
