"use client";

import { logoutAction } from "@/actions/logout.action";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/connexion");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        marginTop: "1rem",
        padding: "0.625rem 1.25rem",
        backgroundColor: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Se déconnecter
    </button>
  );
}