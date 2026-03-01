"use server";

import { signinSchema, type SigninFormData } from "@/schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

export async function loginAction(data: SigninFormData) {
  const parsed = signinSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0].message };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
      },
      headers: await headers(),
    });
    return { success: true };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: "Email ou mot de passe incorrect." };
    }
    console.error("Erreur connexion :", error);
    return { error: "L'authentification a échoué." };
  }
}