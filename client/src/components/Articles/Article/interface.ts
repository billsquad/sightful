export interface ArticleProps {
  _id?: string;
  title: string;
  message: string;
  url: string;
  tags: string[];
  starCount?: number;
  totalReviews?: number[];
  createdAt?: Date;
}
