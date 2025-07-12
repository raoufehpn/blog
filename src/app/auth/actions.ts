"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function adminLogin(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";

    if (username === adminUsername && password === adminPassword) {
        const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com";
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: adminPassword,
        });

        if (error) {
             console.error("Admin login error:", error.message);
             const { error: signUpError } = await supabase.auth.signUp({
                email,
                password: adminPassword,
             });
             if (signUpError) {
                console.error("Admin signup error:", signUpError.message);
                redirect("/admin/login?error=" + encodeURIComponent(signUpError.message));
             } else {
                const { error: signInAgainError } = await supabase.auth.signInWithPassword({ email, password: adminPassword });
                if(signInAgainError) {
                    redirect("/admin/login?error=" + encodeURIComponent(signInAgainError.message));
                } else {
                    revalidatePath("/", "layout");
                    redirect("/admin");
                }
             }
        } else {
            revalidatePath("/", "layout");
            redirect("/admin");
        }
    } else {
        redirect("/admin/login?error=" + encodeURIComponent("Invalid credentials"));
    }
}

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
  redirect('/');
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
