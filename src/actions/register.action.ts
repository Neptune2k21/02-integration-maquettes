"use server";

import { signupSchema, type SignupFormData } from "@/schemas";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

export async function registerAction(data: SignupFormData) {
  const parsed = signupSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0].message };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
      },
    });
    return { success: true };
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === "UNPROCESSABLE_ENTITY") {
        return { error: "L'authentification a échoué." };
      }
    }
    console.error("Erreur inscription :", error);
    return { error: "L'authentification a échoué." };
  }
}