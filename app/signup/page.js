import Link from "next/link";
import Button from "../_components/Button";
import { signup } from "../_lib/actions";
import SignupForm from "../_components/SignupForm";

export const metadata = {
  title: "signup",
};

function page() {
  return (
    <div className="grid h-[90dvh] place-items-center bg-[#f9f6fc]">
      <div className="flex w-80 flex-col items-center justify-center rounded-3xl bg-white p-[72px_32px_48px] text-center">
        <h2 className="mb-8 text-lg font-medium text-purple-600">
          به بوک لاورز خوش آمدید
        </h2>
        <SignupForm />
        <p className="mt-4">
          حساب کابری دارید؟{" "}
          <Link href="/login" className="text-purple-600 underline">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
