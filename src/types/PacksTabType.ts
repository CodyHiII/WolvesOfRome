export type PacksTabType = {
  image?: string;
  title: string;
  subTitle: string;
  isSelected?: boolean | (() => boolean);
  onClick?: () => void;
  disabled?: boolean;
  comingSoon?: boolean;
  color?: string;
};
