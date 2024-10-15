import { forwardRef } from "react";

interface ButtonOptions {}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const { type = "button", children, ...rest } = props;
  return (
    <button
      ref={ref}
      className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-500"
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;