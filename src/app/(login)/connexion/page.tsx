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
import { signinSchema, type SigninFormData } from "@/schemas";
import { toast } from "sonner";

export default function ConnexionPage() {
  const form = useForm<SigninFormData>({
    validate: zodResolver(signinSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: SigninFormData) => {
    try {
    console.log("Données de connexion :", values);
    toast.success("Connexion réussie !");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Échec de la connexion. Veuillez réessayer.");
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
            CONNEXION
          </Heading>

          <TextInput
            id="email"
            type="email"
            label={
              <>
                Adresse email <span style={{ color: "#dc2626" }}>*</span>
              </>
            }
            placeholder="lin.guini@barilla.it..."
            {...form.getInputProps("email")}
          />

          <PasswordInput
            id="password"
            label={
              <>
                Mot de passe <span style={{ color: "#dc2626" }}>*</span>
              </>
            }
            placeholder="Ke$$a..."
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
            Se connecter
          </Button>

          <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <Link
              href="/inscription"
              style={{
                color: "#00704A",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Créer un compte
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}