"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getBookById, getBookPriceById } from "./data-service";

// Regex patterns
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const NAME_REGEX = /^(?=.*[^\d])[\p{L}\s]{3,}$/u; // Supports English and Persian names

function validateEmail(email) {
  if (!EMAIL_REGEX.test(email)) {
    throw new Error("فرمت ایمیل نامعتبر است");
  }
}

function validateName(name) {
  const trimmedName = name.trim();

  // Check character rules
  if (!NAME_REGEX.test(trimmedName)) {
    throw new Error("نام باید حداقل ۳ حرف باشد و فقط شامل حروف و فاصله باشد");
  }
}

export async function signup(formData = FormData) {
  const email = formData.get("email");
  const name = formData.get("name");
  const password = formData.get("password");

  validateEmail(email);
  validateName(name);

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
  } catch (error) {
    if (error) {
      return { success: false, message: error.message };
    }
  }
  revalidatePath("/");
  return { success: true, message: "ثبت نام با موفقیت انجام شد" };
}

export async function login(formData = FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email) return { success: false, message: "لطفا ایمیل خود را وارد کنید" };
  if (!password)
    return { success: false, message: "لطفا رمزعبور خود را وارد کنید" };
  validateEmail(email);
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) {
      return { success: false, message: "ایمل یا رمزعبور اشتباه است." };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "ورود موفقیت آمیز" };
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error("خطا در دریافت اطلاعات کاربر");
  }

  return data?.user;
}

export async function getCart() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("cart")
    .select("*")
    .eq("userId", user.id);

  if (error) {
    console.error("Error fetching cart:", error);
    return [];
  }

  return data;
}

export async function addToCart(bookId) {
  try {
    const supabase = await createClient();
    const user = await getUser();
    const { price } = await getBookPriceById(bookId);

    const { data: isInCart, error: selectError } = await supabase
      .from("cart")
      .select("*")
      .eq("userId", user.id)
      .eq("bookId", bookId)
      .maybeSingle();

    if (selectError)
      return {
        success: false,
        message: `select error: ${selectError.message}`,
      };
    if (isInCart) {
      const { error: updateError } = await supabase
        .from("cart")
        .update({
          quantity: isInCart.quantity + 1,
          price: isInCart.price + price,
        })
        .eq("bookId", isInCart.bookId)
        .select();

      if (updateError)
        return {
          success: false,
          message: `update error: ${updateError.message}`,
        };
    } else {
      const { error: insertError } = await supabase.from("cart").insert({
        userId: user.id,
        bookId: bookId,
        quantity: 1,
        price,
      });
      if (insertError)
        return {
          success: false,
          message: `insert error ${insertError.message}`,
        };
    }
    revalidatePath("/cart");
    revalidatePath("/book/[slug]");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    if (error) {
      return { success: false, message: error.message };
    }
  }
}

export async function decrease(bookId) {
  try {
    const supabase = await createClient();
    const user = await getUser();
    const { price } = await getBookPriceById(bookId);

    const { data: cart, error: cartError } = await supabase
      .from("cart")
      .select("*")
      .eq("userId", user.id)
      .eq("bookId", bookId)
      .maybeSingle();

    if (cartError) return { success: false, message: cartError.message };

    if (cart.quantity > 1) {
      const { data: decreaseData, error: decreaseError } = await supabase
        .from("cart")
        .update({ quantity: cart.quantity - 1, price: cart.price - price })
        .eq("bookId", bookId)
        .eq("userId", user.id)
        .select();
      if (decreaseError)
        return { success: false, message: decreaseError.message };
    } else {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("bookId", bookId)
        .eq("userId", user.id);
    }
    revalidatePath("/cart");
    revalidatePath("/book/[slug]");
    revalidatePath("/");
    return { success: true, cart };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
