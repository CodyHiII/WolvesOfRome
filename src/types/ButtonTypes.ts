export interface DefaultButtonProps {
  variant:
    | 'primary'
    | 'danger'
    | 'secondary'
    | 'success'
    | 'ternary'
    | 'quaternary'
    | 'quaternary-secondary'
    | 'quaternary-ternary'
    | 'quinary';
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'secondary-md';
  href?: string;
  children?: React.ReactNode;
  startIcon?: string | React.ReactElement;
  endIcon?: string | React.ReactElement;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: any;
  margin?: string;
}

export type ButtonProps = {
  as: 'button';
  href?: never;
  target?: never;
  download?: never;
  onClick?: (e?: any) => void;
};

export type AnchorProps = {
  as: 'a';
  href: any;
  target?: '_blank';
  download?: boolean;
  onClick?: never;
};

export type LinkTagProps = {
  as: 'Link';
  href: any;
  target?: never;
  download?: never;
  onClick?: never;
};

export type AsProps = ButtonProps | AnchorProps | LinkTagProps;

export type ButtonTypes = DefaultButtonProps & AsProps;
