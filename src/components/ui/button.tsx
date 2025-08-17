import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Core variants with design system colors
        default: "bg-primary text-primary-foreground hover:bg-primary-hover rounded-2xl shadow-glow hover:shadow-glow transform hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover rounded-2xl shadow-glow-secondary hover:shadow-glow-secondary transform hover:scale-105",
        accent: "bg-accent text-accent-foreground hover:bg-accent-hover rounded-2xl transform hover:scale-105",
        
        // E-commerce specific variants
        hero: "bg-gradient-primary text-white border-0 rounded-2xl shadow-elegant hover:shadow-glow transform hover:scale-105 hover:-translate-y-1",
        cart: "bg-success text-success-foreground hover:bg-success-hover rounded-2xl shadow-glow transform hover:scale-105",
        gradient: "bg-gradient-secondary text-white border-0 rounded-2xl shadow-elegant hover:shadow-glow-secondary transform hover:scale-105",
        
        // Glass effect variant
        glass: "glass text-text-primary hover:bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transform hover:scale-105",
        
        // Traditional variants enhanced
        destructive: "bg-danger text-danger-foreground hover:bg-danger/90 rounded-2xl transform hover:scale-105",
        outline: "border-2 border-border bg-transparent text-text-primary hover:bg-muted hover:text-text-primary rounded-2xl transform hover:scale-105",
        ghost: "bg-transparent text-text-secondary hover:bg-muted hover:text-text-primary rounded-2xl transform hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline bg-transparent p-0 h-auto font-normal",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-xl px-4 py-2 text-xs",
        lg: "h-13 rounded-2xl px-8 py-4 text-base",
        xl: "h-16 rounded-3xl px-12 py-5 text-lg font-semibold",
        icon: "h-11 w-11 rounded-2xl",
        "icon-sm": "h-9 w-9 rounded-xl",
        "icon-lg": "h-13 w-13 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
