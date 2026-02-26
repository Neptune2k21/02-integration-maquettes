import { z } from "zod";

/**
 * Schéma de validation pour l'inscription
 */
export const signupSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("L'email doit être au format valide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
});

/**
 * Schéma de validation pour la connexion
 */
export const signinSchema = z.object({
  email: z.string().email("L'email doit être au format valide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
});

/**
 * Type TypeScript pour les données d'inscription
 */
export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Type TypeScript pour les données de connexion
 */
export type SigninFormData = z.infer<typeof signinSchema>;