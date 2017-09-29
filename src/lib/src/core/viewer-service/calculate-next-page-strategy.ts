export interface NextPageCriteria {
  speed?: number;
  isPastCenter?: boolean;
  pageEndHitCountReached?: boolean;
  direction: string;
  currentPageIndex: number;
}

export interface CalculateNextPageStrategy {
  calculateNextPage(criteria: NextPageCriteria): number;
}
