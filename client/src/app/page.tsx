import ErrorPage from "./error";
import { trpc } from "@client/lib/trpc";

export default async function Home() {
  try {
    const resp = await trpc.test.events.query({ name: "asd" });

    return <div>{resp}</div>;
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
