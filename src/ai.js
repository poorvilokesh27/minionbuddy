import { supabase } from "./config.js";

export async function askMinionBuddy(message, name) {
  const { data, error } =
    await supabase.functions.invoke("minion-chat", {
      body: {
        message,
        name,
      },
    });

  if (error) {
    console.error("MINION AI ERROR:", error);
    throw error;
  }

  return data;
}












