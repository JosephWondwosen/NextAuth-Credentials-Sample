import React, { SVGProps, ReactNode, ForwardRefExoticComponent } from "react";
import clsx from "clsx";

interface ButtonProps {
  size: "small" | "medium" | "large";
  Icon?: ForwardRefExoticComponent<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  >;
  type: "submit" | "reset" | "button";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

function Button({
  size,
  Icon,
  type = "button",
  fullWidth,
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
        "flex justify-center items-center  rounded-md py-3 px-4  transition duration-150 hover:-translate-y-0.5 hover:cursor-pointer hover:bg-slate-500 focus:outline-none",
        {
          "py-3 px-5 text-lg": size === "large",
          "py-2 px-4 text-sm": size === "medium",
          "py-1 px-3 text-xs": size === "small",
          "w-full": fullWidth,
          "w-fit": !fullWidth,
          "bg-slate-700 text-white": !disabled,
          "bg-slate-500 text-white hover:cursor-not-allowed": disabled,
        }
      )}
    >
      {children}
      {Icon && (
        <Icon
          className={clsx("ml-2 text-white", {
            "h-6 w-6": size === "large",
            "h-4 w-4": size === "medium",
            "h-3 w-3": size === "small",
          })}
        />
      )}
    </button>
  );
}

export default Button;
