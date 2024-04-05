import { TRPCError } from "@trpc/server";
import ErrorPage from "./error";
import { trpc } from "./trpc";

export default async function Home() {
  try {
    const resp = await trpc.hello.query({ name: "error" });

    return (
      <main className="flex min-h-screen flex-col items-center justify-between px-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
          {resp}
        </div>
      </main>
    );
  } catch (err: any) {
    if (!!err.data) {
      return (
        <ErrorPage error={err.data.httpStatus + " " + err.message}></ErrorPage>
      );
    } else {
      return <ErrorPage error="An unknown error occurred."></ErrorPage>;
    }
  }
}
