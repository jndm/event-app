import Link from "next/link";
import { HeaderButtons } from "./headerButtons";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background px-4 py-2">
      <div className="flex flex-row justify-between items-center">
        <Link className="text-md lg:text-xl font-bold" href={"/"}>
          Event app
        </Link>
        <div className="flex items-center justify-between">
          <HeaderButtons />
        </div>
      </div>
    </header>
  );
};
