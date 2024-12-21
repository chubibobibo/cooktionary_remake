export type InputProps = {
  inputIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  required: boolean;
  type: string;
  name: string;
  title: string;
  isVisible?: boolean;
  isPassword?: boolean;
  handleClick?: React.MouseEventHandler<HTMLOrSVGElement>;
};

export type StateType = {
  icon1: boolean;
  icon2: boolean;
};
