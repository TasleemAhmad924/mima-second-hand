/**
 * Simplified orientation map. Not a booking selector, not CAD.
 */
import { STORE_PLAN } from "@/data/store-plan";
import { PLAN_COLORS } from "@/lib/store-map/plan-colors";
import type { StorePlanLabel, StorePlanRoomKind } from "@/lib/store-map/types";

const ROOM_FILL: Record<StorePlanRoomKind, string> = {
  kitchen: PLAN_COLORS.kitchen,
  wc: PLAN_COLORS.wc,
  fitting: PLAN_COLORS.fitting,
  play: PLAN_COLORS.play,
};

function outlinePath(points: readonly [number, number][]): string {
  return `${points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
    .join(" ")} Z`;
}

export function StoreMap() {
  const { viewBox, outline, shelves, rooms, stairs, labels } = STORE_PLAN;
  const stepGap = stairs.width / 5;

  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Vereinfachter Grundriss von MiMa in Stockelsdorf. Vier Mittelgänge, Wandregale, Küche, WC, Umkleide, Spielecke und Treppe."
    >
      <path
        d={outlinePath(outline)}
        fill={PLAN_COLORS.floor}
        stroke={PLAN_COLORS.ink}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {rooms.map((room) => (
        <rect
          key={room.id}
          x={room.x}
          y={room.y}
          width={room.width}
          height={room.height}
          rx={2}
          fill={ROOM_FILL[room.kind]}
          stroke={PLAN_COLORS.taupe}
          strokeOpacity={0.12}
          strokeWidth={0.6}
        />
      ))}

      {shelves.map((shelf) => (
        <rect
          key={shelf.id}
          x={shelf.x}
          y={shelf.y}
          width={shelf.width}
          height={shelf.height}
          rx={1}
          fill={shelf.kind === "wall" ? PLAN_COLORS.wall : PLAN_COLORS.aisle}
        />
      ))}

      <g aria-hidden="true">
        <rect
          x={stairs.x}
          y={stairs.y}
          width={stairs.width}
          height={stairs.height}
          rx={1}
          fill={PLAN_COLORS.stairs}
          stroke={PLAN_COLORS.taupe}
          strokeOpacity={0.22}
          strokeWidth={0.6}
        />
        {[1, 2, 3, 4].map((step) => {
          const x = stairs.x + step * stepGap;
          return (
            <line
              key={`step-${step}`}
              x1={x}
              y1={stairs.y + 2.5}
              x2={x}
              y2={stairs.y + stairs.height - 2.5}
              stroke={PLAN_COLORS.taupe}
              strokeWidth={1}
              opacity={0.55}
            />
          );
        })}
      </g>

      {labels.map((label) => (
        <MapLabel key={label.id} label={label} />
      ))}
    </svg>
  );
}

function MapLabel({ label }: { label: StorePlanLabel }) {
  const primary = label.level === "primary";
  const visibility =
    label.from === "lg"
      ? "hidden lg:inline"
      : label.from === "sm" || label.desktopOnly
        ? "hidden sm:inline"
        : undefined;
  return (
    <text
      x={label.x}
      y={label.y}
      textAnchor={label.anchor ?? "middle"}
      dominantBaseline="middle"
      alignmentBaseline="middle"
      fill={primary ? PLAN_COLORS.taupe : PLAN_COLORS.ink}
      className={visibility}
      style={{
        fontSize: primary ? 10 : 8.5,
        letterSpacing: primary ? "0.1em" : "0.06em",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
      }}
    >
      {label.text.toUpperCase()}
    </text>
  );
}
