import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

import { rateArticle } from "../../actions/articles";

interface RatingStarsProps {
  articleId: string;
  starCount: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ articleId, starCount }) => {
  const classes = useStyles();
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const dispatch = useDispatch();

  return (
    <>
      {[...Array(5)].map((_, index) => {
        const rate = index + 1;

        return (
          <label key={index}>
            <input
              className={classes.input}
              type="radio"
              name="rating"
              value={rate}
              onClick={() => {
                setRating(rate);
                dispatch(rateArticle(articleId));
              }}
              onMouseEnter={() => setHover(rate)}
              onMouseOut={() => setHover(null)}
            />
            {rate <= (hover || (rating as number)) ? (
              <StarIcon
                className={classes.star}
                fontSize="small"
                color="secondary"
              />
            ) : (
              <StarBorderIcon
                className={classes.star}
                fontSize="small"
                color="primary"
              />
            )}
          </label>
        );
      })}
      {starCount}
    </>
  );
};

export default RatingStars;
