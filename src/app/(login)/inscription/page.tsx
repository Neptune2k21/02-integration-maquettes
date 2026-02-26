"use client";

import { useForm, zodResolver } from "@mantine/form";
import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Heading,
} from "@arthur.eudeline/starbucks-tp-kit";
import Link from "next/link";
import { signupSchema, type SignupFormData } from "@/schemas";
import { toast } from "sonner";

export default function InscriptionPage() {
  const form = useForm<SignupFormData>({
    validate: zodResolver(signupSchema),
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: SignupFormData) => {
    try {
    console.log("Données d'inscription :", values);
    toast.success("Inscription réussie !");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      toast.error("Échec de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "500px", padding: "clamp(1.5rem, 5vw, 2.5rem)" }}>
      <Card>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <Heading
            as="h1"
            size="lg"
            className="mb-2 text-center"
          >
            INSCRIPTION
          </Heading>

          <TextInput
            id="name"
            label={
              <>
                Nom <span style={{ color: "#dc2626" }}>*</span>
                <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem", fontWeight: 400 }}>
                  Le nom qui sera utilisé pour vos commandes
                </p>
              </>
            }
            placeholder="Maud Zarella"
            {...form.getInputProps("name")}
          />

          <TextInput
            id="email"
            type="email"
            label={
              <>
                Adresse email <span style={{ color: "#dc2626" }}>*</span>
              </>
            }
            placeholder="lin.guini@barilla.it"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            id="password"
            label={
              <>
                Mot de passe <span style={{ color: "#dc2626" }}>*</span>
              </>
            }
            placeholder="Ke$$a1234"
            {...form.getInputProps("password")}
          />

          <Button
            type="submit"
            fullWidth
            style={{
              marginTop: "0.5rem",
              padding: "0.875rem",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            S&apos;inscrire
          </Button>

          <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <Link
              href="/connexion"
              style={{
                color: "#00704A",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Déjà un compte ? Se connecter
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}