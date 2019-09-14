import { Record, List } from "immutable";
import { string } from "prop-types";

interface IOverall {
  label: string,
  rating: string,
}

interface IRating {
  count: string,
  ratingValue: string,
}

interface IReviewStatistics {
  averageOverallRating: string,
  overallRatingRange: string,
  ratingDistributions: List<Record<IRating>>,
  totalReviewCount: string,
}

export interface IReview {
  downVotes: string,
  name: string,
  overallRating: Record<IOverall>,
  reviewText: string,
  title: string,
  upVotes: string,
}

export interface IReviewWithProductInfo {
  availableOnline: boolean,
  brandName: string,
  categoryNode: string,
  categoryPath: string,
  itemId: number,
  name: string,
  nextPage: string,
  productTrackingUrl: string,
  productUrl: string,
  reviewStatistics: Record<IReviewStatistics>,
  reviews: List<Record<IReview>>,
  salePrice: number,
  upc: string,
}