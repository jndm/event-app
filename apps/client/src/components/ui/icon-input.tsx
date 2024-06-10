import * as React from "react";

import { cn } from "@client/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

const IconInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground [&:has(:focus-visible)]:ring-ring [&:has(:focus-visible)]:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <props.icon className="mr-2 h-4 w-4" />
        <input
          className="size-full ml-2 border-none bg-transparent focus:outline-none"
          type={type}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
IconInput.displayName = "Input";

export { IconInput };
