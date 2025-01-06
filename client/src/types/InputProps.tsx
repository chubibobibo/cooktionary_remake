export type InputProps = {
  inputIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  required: boolean;
  type: string;
  name: string;
  title: string;
  isVisible?: boolean;
  isPassword?: boolean;
  handleClick?: React.MouseEventHandler<HTMLOrSVGElement>;
  size: string;
};

export type StateType = {
  icon1: boolean;
  icon2: boolean;
};

export type UserDataType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  id: string;
  role: string;
};
