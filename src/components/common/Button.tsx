
import { cn } from "@/lib/utils";
import React from "react";
import { Slot } from "@radix-ui/react-slot";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      loading = false,
      fullWidth = false,
      asChild = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        "bg-brand-orange text-white hover:opacity-90 active:opacity-100 shadow-button",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "bg-transparent text-foreground hover:bg-muted",
      outline:
        "bg-transparent border border-muted-foreground/20 hover:border-muted-foreground/30 text-foreground hover:bg-muted/5",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-4 py-2 rounded-md",
      lg: "px-5 py-2.5 text-lg rounded-md",
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={loading || disabled}
        className={cn(
          "relative font-medium inline-flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:opacity-60 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={cn(loading && "invisible")}>
          {iconPosition === "left" && icon && (
            <span className="mr-2 inline-flex">{icon}</span>
          )}
          {children}
          {iconPosition === "right" && icon && (
            <span className="ml-2 inline-flex">{icon}</span>
          )}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";
export default Button;
