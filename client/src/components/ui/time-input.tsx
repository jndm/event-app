import * as React from "react";

import { ClockIcon } from "lucide-react";
import { cn } from "@client/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TimeInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    props.value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!props.onChange) return;

      // do not allow more than 5 characters
      if (e.target.value.length > 5) return;

      // do not allow any other chars than numbers and colon
      if (e.target.value !== "" && !/^[0-9:]+$/.test(e.target.value)) {
        return;
      }

      // do not allow multiple colons
      if (e.target.value.split(":").length > 2) {
        return;
      }

      // verify that colon is added, and time cant be more than 23:59
      if (e.target.value.length > 3) {
        if (e.target.value.indexOf(":") === -1) {
          if (parseInt(e.target.value, 10) > 2400) {
            e.target.value = "23:59";
          } else {
            e.target.value = `${e.target.value.slice(
              0,
              2
            )}:${e.target.value.slice(2, 4)}`;
          }
        }
      }

      props.onChange(e);
    };

    return (
      <div
        className={cn(
          "flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground [&:has(:focus-visible)]:ring-ring [&:has(:focus-visible)]:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <ClockIcon className="mr-2 h-4 w-4" />
        <input
          className="size-full ml-2 border-none bg-transparent focus:outline-none"
          type={type}
          ref={ref}
          {...props}
          onChange={handleChange}
        />
      </div>
    );
  }
);

TimeInput.displayName = "TimeInput";

export { TimeInput };
