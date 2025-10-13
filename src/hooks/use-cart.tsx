import { create } from "zustand";
import type { CartData } from "@/types";

export const useCart = create<CartData>(() => ({
  lines: [],
}));