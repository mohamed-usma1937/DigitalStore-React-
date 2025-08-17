import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        
        // E-commerce specific badges
        new: "border-transparent bg-accent text-accent-foreground animate-pulse-glow",
        bestseller: "border-transparent bg-gradient-primary text-white font-bold shadow-glow",
        sale: "border-transparent bg-danger text-danger-foreground animate-glow",
        popular: "border-transparent bg-success text-success-foreground",
        featured: "border-transparent bg-gradient-secondary text-white shadow-glow-secondary",
        
        // Status badges
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        info: "border-transparent bg-primary text-primary-foreground",
        
        // Glass effect
        glass: "glass text-text-primary backdrop-blur-xl border border-white/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
