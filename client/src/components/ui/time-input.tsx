import * as React from "react";

import { ClockIcon } from "lucide-react";
import { IconInput } from "./icon-input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TimeInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return <IconInput icon={ClockIcon} {...props} ref={ref} />;
  }
);

TimeInput.displayName = "TimeInput";

export { TimeInput };
