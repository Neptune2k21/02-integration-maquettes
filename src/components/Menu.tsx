"use client";

import { MenuBar } from "@arthur.eudeline/starbucks-tp-kit";
import { Popover } from "@headlessui/react";
import { ShoppingCart, X } from "@phosphor-icons/react/dist/ssr";

export default function Menu() {
  return (
    <MenuBar
      trailing={
        <div className="w-full flex items-center justify-end pr-2 sm:pr-4 lg:pr-8">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="relative inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm px-3 py-2 hover:bg-gray-50 transition">
                  {open ? (
                    <X size={22} weight="bold" />
                  ) : (
                    <ShoppingCart size={22} weight="bold" />
                  )}
                  <span className="sr-only">Ouvrir le panier</span>
                </Popover.Button>

                <Popover.Panel className="absolute right-0 mt-3 w-64 rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-4 z-50">
                  <p className="text-sm text-gray-600 text-center">
                    Votre panier est vide ☕
                  </p>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
      }
    />
  );
}
