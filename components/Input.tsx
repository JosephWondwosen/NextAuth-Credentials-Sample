import React from "react";
import clsx from "clsx";

interface InputProps {
  id: string;
  name: string;
  type: "text" | "password" | "email";
  placeholder?: string;
  size: "small" | "medium" | "large";
  fullwidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size, fullwidth, ...restProps }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          " rounded-md border border-gray-300 placeholder:text-gray-300 focus:border-slate-500 focus:outline-none",
          {
            "p-4": size === "large",
            "p-3": size === "medium",
            "p-2": size === "small",
            "w-full": fullwidth,
            "w-fit": !fullwidth,
          }
        )}
        {...restProps}
      />
    );
  }
);

export default Input;
