import { STORE_PLAN } from "@/data/store-plan";
import { StoreMap } from "@/components/store-map/StoreMap";
import type { StorePlanLegendItem } from "@/lib/store-map/types";

export function StoreMapExplorer() {
  const primary = STORE_PLAN.legend.filter((item) => item.group === "primary");
  const secondary = STORE_PLAN.legend.filter(
    (item) => item.group === "secondary",
  );

  return (
    <figure className="mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:mx-0 lg:max-w-[34rem]">
      <div className="px-2 sm:px-4">
        <StoreMap />
      </div>
      <figcaption className="mt-6 border-t border-line pt-5">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-charcoal">
          {primary.map((item) => (
            <LegendItem key={item.id} item={item} />
          ))}
        </ul>
        <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">
          {secondary.map((item) => (
            <LegendItem key={item.id} item={item} />
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

function LegendItem({ item }: { item: StorePlanLegendItem }) {
  return (
    <li className="inline-flex items-center gap-2">
      <LegendSwatch item={item} />
      <span>{item.label}</span>
    </li>
  );
}

function LegendSwatch({ item }: { item: StorePlanLegendItem }) {
  if (item.mark === "stairs") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        className="size-3 shrink-0"
      >
        <rect
          x="0.5"
          y="0.5"
          width="11"
          height="11"
          rx="1.5"
          fill={item.color}
          stroke="#4A3A32"
          strokeOpacity="0.22"
        />
        {[3, 5.5, 8].map((x) => (
          <line
            key={x}
            x1={x}
            y1="3"
            x2={x}
            y2="9"
            stroke="#4A3A32"
            strokeWidth="1"
            opacity="0.55"
          />
        ))}
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="size-3 shrink-0 rounded-[2px] border border-charcoal/15"
      style={{ backgroundColor: item.color }}
    />
  );
}
