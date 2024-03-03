import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-primary",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        waiting:
          "border-transparent bg-blue-500 text-primary hover:bg-blue-500/80",
        progress:
          "border-transparent bg-yellow-500 text-primary hover:bg-yellow-500/80",
        completed:
          "border-transparent bg-green-500 text-primary hover:bg-green-500/80",
        "waiting-outline":
          "border-transparent border border-blue-500 text-blue-500 hover:border-blue-500/80",
        "progress-outline":
          "border-transparent border border-yellow-500 text-yellow-500 hover:border-yellow-500/80",
        "completed-outline":
          "border-transparent border border-green-500 text-green-500 hover:border-green-500/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export default function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
