import Link from "next/link";
import Button from "../_components/Button";
import { login } from "../_lib/actions";
import LoginForm from "../_components/LoginForm";

export const metadata = {
  title: "Login",
};

function page() {
  return (
    <div className="grid h-[90dvh] place-items-center bg-[#f9f6fc]">
      <div className="flex w-80 flex-col items-center justify-center rounded-3xl bg-white p-[72px_32px_48px] text-center">
        <h2 className="mb-8 text-lg font-medium text-purple-600">
          به بوک لاورز خوش آمدید
        </h2>
        <LoginForm />
        <p className="mt-4">
          حساب کابری ندارید؟{" "}
          <Link href="/signup" className="text-purple-600 underline">
            ثبت نام کنید
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
