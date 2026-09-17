import { STORE_PLAN } from "@/data/store-plan";
import { StoreMap } from "@/components/store-map/StoreMap";

export function StoreMapExplorer() {
  const primary = STORE_PLAN.legend.filter((item) => item.group === "primary");
  const secondary = STORE_PLAN.legend.filter(
    (item) => item.group === "secondary",
  );

  return (
    <figure className="mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:mx-0 lg:max-w-[32rem]">
      <StoreMap />
      <figcaption className="mt-5 border-t border-line pt-4">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-charcoal">
          {primary.map((item) => item.label).join(" / ")}
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted">
          {secondary.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
