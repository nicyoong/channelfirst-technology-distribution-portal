"use client";

import { useEffect, useRef } from "react";
import { X, Minus, Plus, Trash2, FileText, Package } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { useRFQCart, useTierInfo } from "@/hooks/use-rfq-cart";
import { formatMYR, getTierLabel } from "@/lib/pricing";

interface RFQDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export function RFQDrawer({ isOpen, onClose, onOpen }: RFQDrawerProps) {
  const {
    items,
    isOpen: cartOpen,
    notes,
    setNotes,
    submittedRef,
    addToCart,
    removeFromCart,
    updateQuantity,
    submitRFQ,
    totalItems,
    estimatedTotal,
    formatMYR,
  } = useRFQCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Open/close management handled by parent, but we track internally
  useEffect(() => {
    if (isOpen) onOpen();
  }, [isOpen, onOpen]);

  const handleAdd = (product: { sku: string; name: string; vendor: string }) => {
    // This is a stub — real add-to-cart is handled by the parent's addToCart
    // The drawer reads from the same cart state
    addToCart({
      sku: product.sku,
      name: product.name,
      vendor: product.vendor,
      category: "",
      description: "",
      shortDesc: "",
      specs: [],
      fullSpecs: [],
      stock: "in-stock",
      priceNote: "",
      branchStock: [],
      warranty: "",
      tags: [],
      tieredPrice: {
        listPrice: 0,
        tiers: [
          { minQty: 1, maxQty: 9, unitPrice: 0, discountPercent: 0 },
          { minQty: 10, maxQty: 49, unitPrice: 0, discountPercent: 10 },
          { minQty: 50, maxQty: null, unitPrice: 0, discountPercent: 20 },
        ],
      },
    } as any);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Request for Quote cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-base font-bold text-navy">Request a Quote</h2>
              <p className="text-xs text-muted-foreground">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in your RFQ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 transition-colors hover:bg-accent"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-base font-semibold text-foreground">
                Your RFQ is empty
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                Add products from the catalogue or product detail pages to build
                your quote request.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={onClose}
              >
                Browse Catalogue
              </Button>
            </div>
          ) : (
            items.map((item) => {
              const tierInfo = useTierInfo(item.product, item.quantity);
              const unitPrice = tierInfo.current?.unitPrice ?? 0;
              const lineTotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.product.sku}
                  className="rounded-xl border border-border bg-card p-4 space-y-3"
                >
                  {/* Product row */}
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {item.product.vendor[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground">
                        {item.product.sku}
                      </p>
                      {item.product.tieredPrice && (
                        <p className="text-xs text-primary font-medium mt-0.5">
                          {formatMYR(unitPrice)}/unit · {getTierLabel(tierInfo.current)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.sku)}
                      className="rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                      aria-label={`Remove ${item.product.name} from RFQ`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Quantity stepper + tier incentive */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.sku, item.quantity - 1)
                        }
                        className="h-8 w-8 rounded-md border border-border flex items-center justify-center hover:bg-accent transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.sku, item.quantity + 1)
                        }
                        className="h-8 w-8 rounded-md border border-border flex items-center justify-center hover:bg-accent transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">
                        {formatMYR(lineTotal)}
                      </p>
                      {tierInfo.savingsPerUnit > 0 && (
                        <p className="text-xs text-success">
                          Save {formatMYR(tierInfo.savingsPerUnit)}/unit
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tier incentive */}
                  {tierInfo.qualifierNote && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                      <div className="flex items-start gap-2">
                        <Badge variant="warning" size="sm" className="shrink-0">
                          {tierInfo.next?.discountPercent}% OFF
                        </Badge>
                        <p className="text-xs text-amber-800 leading-relaxed">
                          {tierInfo.qualifierNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-4">
            {/* Estimated total */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Estimated Total
              </span>
              <span className="text-xl font-bold text-navy">
                {formatMYR(estimatedTotal)}
              </span>
            </div>

            {/* Notes */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes for your quote request (optional)..."
              className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-muted-foreground"
              aria-label="RFQ notes"
            />

            <Button
              className="w-full gap-2 bg-primary hover:bg-primary/90"
              size="lg"
              onClick={() => {
                const ref = submitRFQ();
                if (ref) {
                  // Show success — parent can listen for this
                  onClose();
                }
              }}
            >
              <FileText className="h-4 w-4" />
              Submit RFQ
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
