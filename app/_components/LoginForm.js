"use client";
import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { login } from "../_lib/actions";
import toast from "react-hot-toast";
import SpinnerMini from "./SpinnerMini";

function LoginForm() {
  const inputStyle =
    "text-stone-700 px-1.5 h-[48px] w-full rounded-lg text-right rtl text-sm bg-[#f4f1f7] border-none focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-stone-600";

  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);
    const result = await login(formData);

    if (result.success) {
      toast.success(result.message);
      route.push("/");
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 flex w-full flex-col items-center justify-center gap-3 bg-white text-center"
    >
      <input
        name="email"
        type="email"
        placeholder="ایمیل خود را وارد کنید"
        required
        className={inputStyle}
      />
      <input
        name="password"
        type="password"
        placeholder="رمز خود را وارد کنید"
        required
        className={`${inputStyle} mb-2.5`}
      />

      <Button type="submit">{loading ? <SpinnerMini /> : "وارد شوید"}</Button>
    </form>
  );
}

export default LoginForm;
