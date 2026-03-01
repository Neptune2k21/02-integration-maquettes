"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function logoutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
    return { success: true };
  } catch (error) {
    console.error("Erreur déconnexion :", error);
    return { error: "La déconnexion a échoué." };
  }
}