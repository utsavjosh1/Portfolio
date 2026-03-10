import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-250 cursor-pointer whitespace-nowrap font-body",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-[var(--bg)] rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_30px_var(--accent-glow)] active:translate-y-0",
        ghost: "text-[var(--text-2)] hover:text-[var(--text)]",
        outline:
          "border border-strong rounded-full bg-surface hover:border-accent hover:text-accent hover:shadow-glow",
      },
      size: {
        sm: "text-xs px-4 py-2",
        md: "text-sm px-6 py-3",
        lg: "text-base px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
