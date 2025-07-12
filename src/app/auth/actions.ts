"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";

    // This is a simple, non-production-ready auth check.
    // In a real app, use a proper auth provider.
    if (username === adminUsername && password === adminPassword) {
        // For this simple auth, we'll use Supabase to sign in a dummy user
        // to get a session. This is a workaround to integrate with the existing session management.
        // A more robust solution would use a dedicated admin auth system (e.g., cookies, JWT).
        const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@example.com";
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: adminPassword, // Use a secure password for your dummy admin in Supabase
        });

        if (error) {
             console.error("Admin login error:", error.message);
             // Attempt to sign up the dummy admin user if they don't exist.
             // This should only happen once.
             const { error: signUpError } = await supabase.auth.signUp({
                email,
                password: adminPassword,
             });
             if (signUpError) {
                console.error("Admin signup error:", signUpError.message);
                redirect("/login?error=" + encodeURIComponent(signUpError.message));
             } else {
                 // Retry sign-in after sign-up
                const { error: signInAgainError } = await supabase.auth.signInWithPassword({ email, password: adminPassword });
                if(signInAgainError) {
                    redirect("/login?error=" + encodeURIComponent(signInAgainError.message));
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
        redirect("/login?error=" + encodeURIComponent("Invalid credentials"));
    }
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
