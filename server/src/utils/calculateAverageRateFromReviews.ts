export function countAverageRateFromReviews(totalReviews: number[]) {
  let average: number = 0;

  if (totalReviews.length > 0) {
    const sum = totalReviews.reduce((acc, num) => (acc += num), 0);

    average = sum / totalReviews.length;
  }

  return average;
}
