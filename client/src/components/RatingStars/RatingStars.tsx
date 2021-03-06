import React, { MouseEventHandler, useEffect, useState } from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

import { rateArticle } from "../../actions/articles";

interface RatingStarsProps {
  articleId: string;
  totalReviewsCount: number;
  averageRate: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  children,
  articleId,
  totalReviewsCount,
  averageRate,
}) => {
  const articleRatesLocalStorage = JSON.parse(
    localStorage.getItem(`userArticleRate${articleId}`) || "{}"
  );
  const user = JSON.parse(localStorage.getItem("sessionId") as string);

  const classes = useStyles();
  const [, setRating] = useState<number | null>(Math.round(averageRate));
  const [userRate, setUserRate] = useState<number | null>(
    articleRatesLocalStorage.userRate || null
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
              disabled={!user?.result}
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
      {children}
      {user && userRate && (
        <>
          &nbsp;
          <span style={{ fontSize: "0.8rem" }}>
            Your rate: <span style={{ fontWeight: "bold" }}>{userRate}/5</span>
          </span>
        </>
      )}
    </>
  );
};

export default RatingStars;
