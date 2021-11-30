import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "wouter";

import useStyles from "./styles";

const CustomPagination = () => {
  const classes = useStyles();

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/articles?page=${1}`} />
      )}
    />
  );
};

export default CustomPagination;
