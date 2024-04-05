"use client";

export default function ErrorPage(props: { error: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        {props.error}
      </div>
    </main>
  );
}
