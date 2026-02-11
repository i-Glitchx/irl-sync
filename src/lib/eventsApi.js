import { supabase } from "./supabaseClient";

export async function getUpcomingEvents(limit = 25) {
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("starts_at", nowIso)
    .order("starts_at", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}
