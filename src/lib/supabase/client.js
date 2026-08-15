"use client";

import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

let browserClient;

export function createBrowserClient() {
  if (!browserClient) {
    const { url, key } = getSupabaseConfig();
    browserClient = createSupabaseBrowserClient(url, key);
  }

  return browserClient;
}
