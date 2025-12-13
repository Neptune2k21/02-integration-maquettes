"use client";

import { MenuBar } from "@arthur.eudeline/starbucks-tp-kit";
import { Popover } from "@headlessui/react";
import { ShoppingCart, X, User } from "@phosphor-icons/react/dist/ssr";
import Cart from "@/components/Cart";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

export default function Menu() {
  const linesCount = useCart((state) => state.lines.length);

  return (
    <MenuBar
      trailing={
        <div className="w-full flex items-center justify-end gap-2 pr-2 sm:pr-4 lg:pr-8">
          {/* Bouton Mon compte */}
          <Link
            href="/mon-compte"
            className="relative inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm px-3 py-2 hover:bg-gray-50 transition"
          >
            <User size={22} weight="bold" />
            <span className="sr-only">Mon compte</span>
          </Link>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="relative inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm px-3 py-2 hover:bg-gray-50 transition">
                  {open ? (
                    <X size={22} weight="bold" />
                  ) : (
                    <>
                      <ShoppingCart size={22} weight="bold" />
                      {linesCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#00704A] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {linesCount}
                        </span>
                      )}
                    </>
                  )}
                  <span className="sr-only">Ouvrir le panier</span>
                </Popover.Button>

                <Popover.Panel className="absolute right-0 mt-3 w-[380px] max-w-[calc(100vw-2rem)] rounded-xl bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden">
                  <Cart />
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
      }
    />
  );
}