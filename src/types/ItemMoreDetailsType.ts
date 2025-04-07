export type ItemMoreDetailsType = {
  items: any;
  index: number;
  totalItems?: number;
  loadMore?: () => void;
  pageSize?: number;
  currentPage?: number;
};
