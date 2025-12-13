"use client";

import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { X } from "@phosphor-icons/react";

export default function OrderModalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleClose = () => {
    router.push("/mon-compte");
  };

  return (
    <Dialog open={true} onClose={handleClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Conteneur modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header avec bouton fermer */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <Dialog.Title className="text-xl font-bold text-gray-900">
              Détails de la commande
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 hover:bg-gray-100 transition"
            >
              <X size={24} weight="bold" />
            </button>
          </div>

          {/* Contenu scrollable */}
          <div className="overflow-y-auto flex-1">
            {children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
