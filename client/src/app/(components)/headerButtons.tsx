"use client";
import { buttonVariants } from "@client/components/ui/button";
import { useMediaQuery } from "../(hooks)/useMediaQuery";
import Link from "next/link";
import { CalendarPlus, CircleUserRound } from "lucide-react";

export const HeaderButtons = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div className="flex flex-row items-center gap-4">
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
          href={"/events"}
        >
          Create Event
        </Link>
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
          href={"/login"}
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-4">
      <Link
        className={buttonVariants({
          variant: "outline",
          size: "icon",
        })}
        href={"/events"}
      >
        <CalendarPlus className="h-6 w-6" />
      </Link>
      <Link
        className={buttonVariants({
          variant: "outline",
          size: "icon",
        })}
        href={"/login"}
      >
        <CircleUserRound className="h-6 w-6" />
      </Link>
    </div>
  );
};
