import { Badge } from "@/components/ui/badge";
import type { ProductBadge } from "@/types";

const BADGE_CONFIG: Record<ProductBadge, { label: string; variant: "gold" | "navy" | "emerald" | "outline" }> = {
  bestseller: { label: "Хит продаж", variant: "navy" },
  premium: { label: "Премиум", variant: "gold" },
  fresh: { label: "Свежий улов", variant: "emerald" },
  new: { label: "Новинка", variant: "outline" },
};

export function ProductBadges({ badges }: { badges: ProductBadge[] }) {
  if (!badges.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.map((b) => {
        const config = BADGE_CONFIG[b];
        return (
          <Badge key={b} variant={config.variant}>
            {config.label}
          </Badge>
        );
      })}
    </div>
  );
}
