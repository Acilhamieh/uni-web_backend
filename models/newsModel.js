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
