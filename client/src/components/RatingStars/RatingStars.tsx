import React, { MouseEventHandler, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

import { getArticles, rateArticle } from "../../actions/articles";

interface RatingStarsProps {
  articleId: string;
  totalReviewsCount: number;
  averageRate: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  articleId,
  totalReviewsCount,
  averageRate,
}) => {
  const localStorageJSON = JSON.parse(
    localStorage.getItem(`userArticleRate${articleId}`) || "{}"
  );

  const classes = useStyles();
  const [rating, setRating] = useState<number | null>(Math.round(averageRate));
  const [userRate, setUserRate] = useState<number | null>(
    localStorageJSON.userRate || null
  );
  const [hover, setHover] = useState<number | null>(null);

  const dispatch = useDispatch();

  const handleClick = (rate: number) => {
    setUserRate(rate);
    setRating(Math.round(averageRate));
    localStorage.setItem(
      `userArticleRate${articleId}`,
      JSON.stringify({ userRate: rate, articleId })
    );

    dispatch(rateArticle(articleId, rate));
  };

  useEffect(() => {
    dispatch(getArticles());
  }, [rating, userRate]);

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
              value={Math.round(averageRate)}
              onClick={() =>
                handleClick(rate) as
                  | MouseEventHandler<HTMLInputElement>
                  | undefined
              }
            />
            {rate <= (hover || Math.round(averageRate)) ? (
              <StarIcon
                className={classes.star}
                fontSize="small"
                color="secondary"
                onMouseEnter={() => setHover(rate)}
                onMouseLeave={() => setHover(null)}
              />
            ) : (
              <StarBorderIcon
                className={classes.star}
                fontSize="small"
                color="primary"
                onMouseEnter={() => setHover(rate)}
                onMouseLeave={() => setHover(null)}
              />
            )}
          </label>
        );
      })}
      &nbsp;
      <span>
        Total reviews: <strong>{totalReviewsCount}</strong>
      </span>
      &nbsp;
      {userRate && (
        <span>
          Your rate: <span style={{ fontWeight: "bold" }}>{userRate}/5</span>
        </span>
      )}
    </>
  );
};

export default RatingStars;
