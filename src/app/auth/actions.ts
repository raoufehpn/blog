
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export async function createPost(formData: FormData) {
  // This is a mock function for the preview app.
  // It doesn't actually save to a database but simulates the action.
  const title = formData.get('title') as string;
  console.log("Creating new post with title:", title);
  
  // In a real app, you would add the data to your database here.
  
  revalidatePath('/admin');
  redirect('/admin?message=Post+created+successfully');
}
