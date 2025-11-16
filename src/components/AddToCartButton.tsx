"use client";

import { Button } from "@arthur.eudeline/starbucks-tp-kit";
import { addLine } from "@/hooks/use-cart";
import type { ProductData } from "@arthur.eudeline/starbucks-tp-kit/types";

type AddToCartButtonProps = {
  product: ProductData;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

export default function AddToCartButton({ 
  product, 
  style, 
  className,
  children = "Ajouter au panier" 
}: AddToCartButtonProps) {
  const handleClick = () => {
    addLine(product);
  };

  return (
    <Button 
      onClick={handleClick}
      style={style}
      className={className}
    >
      {children}
    </Button>
  );
}