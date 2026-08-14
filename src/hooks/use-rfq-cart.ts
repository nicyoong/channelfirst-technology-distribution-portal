"use client";

import { useState, useCallback } from "react";
import type { Product } from "@/data/products";

interface RFQItem {
  product: Product;
  quantity: number;
  notes: string;
}

export function useRFQCart() {
  const [items, setItems] = useState<RFQItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.sku === product.sku);
      if (existing) {
        return prev.map((i) =>
          i.product.sku === product.sku
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, notes: "" }];
    });
  }, []);

  const removeFromCart = useCallback((sku: string) => {
    setItems((prev) => prev.filter((i) => i.product.sku !== sku));
  }, []);

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sku);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.sku === sku ? { ...i, quantity } : i))
    );
  }, [removeFromCart]);

  const submitRFQ = useCallback(() => {
    if (items.length === 0) return null;
    const ref = `RFQ-CFT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
    setSubmittedRef(ref);
    setItems([]);
    setNotes("");
    setIsOpen(false);
    return ref;
  }, [items]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    isOpen,
    setIsOpen,
    notes,
    setNotes,
    submittedRef,
    addToCart,
    removeFromCart,
    updateQuantity,
    submitRFQ,
    totalItems,
  };
}
