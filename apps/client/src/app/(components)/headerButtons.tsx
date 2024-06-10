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
          <div className="flex flex-row gap-1 items-center">
            <CalendarPlus className="h-6 w-6" />
            <span>Create Event</span>
          </div>
        </Link>
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
          href={"/login"}
        >
          <div className="flex flex-row gap-1 items-center">
            <CircleUserRound className="h-6 w-6" />
            <span>Login</span>
          </div>
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
