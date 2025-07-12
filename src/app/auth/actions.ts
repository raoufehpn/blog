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


export async function createPost(formData: FormData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/login');
  }

  const { data: author } = await supabase
    .from('authors')
    .select('id')
    .limit(1)
    .single();
  
  if (!author) {
    throw new Error('No author found in the database.');
  }

  const title = formData.get('title') as string;
  const slug = (formData.get('slug') as string).toLowerCase().replace(/\s+/g, '-');
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim());

  const postContent = {
    _key: Math.random().toString(36).substring(2, 11),
    _type: 'block',
    children: [{
      _key: Math.random().toString(36).substring(2, 11),
      _type: 'span',
      marks: [],
      text: content,
    }],
    markDefs: [],
    style: 'normal',
  };

  const { data: newPost, error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      excerpt,
      content: [postContent],
      author_id: author.id,
      tags,
      published_at: new Date().toISOString(),
      cover_image_url: `https://placehold.co/1200x630.png?text=${encodeURIComponent(title)}`,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return redirect('/admin/new?error=' + encodeURIComponent(error.message));
  }
  
  // Note: For simplicity, we are not handling category linking in this step.

  revalidatePath('/admin');
  revalidatePath('/posts');
  revalidatePath('/');
  redirect('/admin');
}
