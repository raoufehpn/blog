"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  
  if (!title) {
    return { message: 'Title is required.' };
  }

  // This is a mock function. In a real app, you would save to a database.
  console.log("Creating new post with title:", title);
  
  revalidatePath('/admin');
  // Instead of redirecting here, we'll return a success message.
  // The component will handle the redirection.
  // redirect('/admin'); 
  return { message: `Post "${title}" created successfully` };
}