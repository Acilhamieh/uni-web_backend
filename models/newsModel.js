import supabase  from "../config/supabase.js";

export async function getAllNews() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false }); // latest news first

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
import crypto from "crypto";
export async function addNews(newsData, file) {
  if (!file) {
    throw new Error("Image file is required.");
  }

  // Generate unique filename
  const filename = `${crypto.randomUUID()}-${file.originalname}`;

  // Upload image to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("news-images")
    .upload(filename, file.buffer, {
      contentType: file.mimetype,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from("news-images")
    .getPublicUrl(filename);

  // Merge image_url into news data
  const fullNewsData = {
    ...newsData,
    image_url: publicUrl,
  };

  // Insert into news table
  const { data, error } = await supabase
    .from("news")
    .insert([fullNewsData])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}