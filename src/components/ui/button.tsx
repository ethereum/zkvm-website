import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // New variants that match existing CSS exactly
        "primary-legacy": "font-['Inter',sans-serif] px-8 py-3.5 text-base rounded-md border border-transparent bg-[var(--primary)] text-[var(--white)] border-[var(--primary)] hover:bg-[var(--primary-dark)] hover:border-[var(--primary-dark)] hover:-translate-y-0.5 hover:shadow-[0_8px_15px_rgba(15,118,110,0.2)] transition-all duration-200",
        "secondary-legacy": "font-['Inter',sans-serif] px-8 py-3.5 text-base rounded-md bg-transparent text-[var(--white)] border border-[var(--slate)] hover:bg-[var(--slate)] hover:border-[var(--slate)] hover:-translate-y-0.5 transition-all duration-200",
        "book-primary": "font-['Inter',sans-serif] px-8 py-3.5 text-base rounded-md border border-transparent bg-white text-[var(--dark)] hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-[0_8px_15px_rgba(0,0,0,0.1)] transition-all duration-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        // Legacy size that matches existing CSS
        "legacy": "px-8 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
