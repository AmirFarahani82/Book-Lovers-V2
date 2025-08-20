"use client";
import Button from "@/app/_components/Button";

function Error({ error, reset }) {
  return (
    <main className="mt-8 flex min-h-screen flex-col items-center justify-start gap-6">
      <h1 className="text-2xl">خطایی رخ داد</h1>
      <p className="text-xl">{error.message}</p>

      <Button onClick={reset}>مجددا تلاش کنید</Button>
    </main>
  );
}

export default Error;
