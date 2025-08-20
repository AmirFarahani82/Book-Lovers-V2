"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "../_lib/actions";
import Button from "./Button";
import toast from "react-hot-toast";
import SpinnerMini from "./SpinnerMini";

function SignupForm() {
  const inputStyle =
    "text-stone-700 px-1.5 h-[48px] w-full rounded-lg text-right rtl text-sm bg-[#f4f1f7] border-none focus:outline-none focus:ring-2 focus:ring-purple-600 placeholder:text-stone-600";

  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);
    const result = await signup(formData);

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
        name="name"
        type="text"
        placeholder="نام خود را وارد کنید"
        required
        className={inputStyle}
      />
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

      <Button type="submit">{loading ? <SpinnerMini /> : "ثبت نام"} </Button>
    </form>
  );
}

export default SignupForm;
