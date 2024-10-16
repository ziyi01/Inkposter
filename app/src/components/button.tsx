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

      type={type}
      ref={ref}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md shadow-md"
      {...rest}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;