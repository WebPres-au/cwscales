import "server-only";

import { redirect } from "next/navigation";
import { createServerClient } from "./server";

const DEFAULT_ADMIN_EMAIL = "louis@cwscales.com.au";

export async function getAdminIdentity() {
  const supabase = await createServerClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const allowedEmail = (
    process.env.SUPABASE_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL
  ).toLowerCase();

  if (error || !claims?.sub || claims.email?.toLowerCase() !== allowedEmail) {
    return null;
  }

  return { id: claims.sub, email: claims.email };
}

export async function requireAdmin({ redirectTo } = {}) {
  const admin = await getAdminIdentity();
  if (!admin) {
    if (redirectTo) redirect(redirectTo);
    throw new Error("Unauthorized");
  }
  return admin;
}
