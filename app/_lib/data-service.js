import { createClient as createServerClient } from "@/utils/supabase/server";
import { createClient as createBrowserClient } from "@/utils/supabase/client";

export async function getbooks({ filter, page } = {}) {
  const supabase = createBrowserClient();
  let query = supabase.from("books").select("*", { count: "exact" });
  if (filter === "bestsellers") {
    query = query.gte("sellCounts", 2000);
  }

  if (page) {
    const pageSize = 10;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    throw new Error("خطا در دریافت کتاب ها");
  }

  return { data, count };
}

export async function getBookById(id) {
  const supabase = createBrowserClient();

  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (!book) throw new Error("کتابی یافت نشد");
  if (error) {
    throw new Error("خطا در دریافت کتاب ها");
  }

  return book;
}

export async function getBookPriceById(id) {
  const supabase = createBrowserClient();

  const { data: bookPrice, error } = await supabase
    .from("books")
    .select("price")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("خطا در دریافت قیمت کتاب");
  }

  return bookPrice;
}

export async function signup({ email, password, name }) {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
  if (error) {
    throw new Error(error.message || "خطا در ایجاد حساب کاربری");
  }
  if (data) {
  }
  return data;
}
