"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function userLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message));
  }

  revalidatePath('/', 'layout');
  
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com";
  if (email === adminEmail) {
    redirect('/admin');
  } else {
    redirect('/');
  }
}

export async function userSignUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message));
  }

  revalidatePath('/', 'layout');
  redirect('/');
}


export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Logout error:", error.message);
        redirect("/?error=" + encodeURIComponent(error.message));
    }

    revalidatePath("/", "layout");
    redirect("/");
}
