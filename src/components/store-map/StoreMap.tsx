/**
 * Simplified orientation map. Not a booking selector, not CAD.
 */
import { STORE_PLAN } from "@/data/store-plan";
import type { StorePlanLabel, StorePlanRoomKind } from "@/lib/store-map/types";

const INK = "#292725";
const TAUPE = "#4A3A32";
const LINE = "#4A3A32";
const FLOOR = "#f4efe8";
const WOOD = "#CEBBA9";
const SERVICE = "#e4d9cb";
const FITTING = "#ddd1c2";
const PLAY = "#e4e9de";

const ROOM_FILL: Record<StorePlanRoomKind, string> = {
  kitchen: SERVICE,
  wc: SERVICE,
  fitting: FITTING,
  play: PLAY,
};

function outlinePath(points: readonly [number, number][]): string {
  return `${points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
    .join(" ")} Z`;
}

const STAIR_XS = [10, 22, 34, 46] as const;

export function StoreMap() {
  const { viewBox, outline, shelves, rooms, stairs, labels } = STORE_PLAN;

  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Vereinfachter Grundriss von MiMa in Stockelsdorf. Vier Mittelgänge, Wandregale, Küche, WC, Umkleide, Spielecke und Treppe."
    >
      <path
        d={outlinePath(outline)}
        fill={FLOOR}
        stroke={INK}
        strokeWidth={1.65}
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
          rx={room.kind === "play" ? 3 : 1.5}
          fill={ROOM_FILL[room.kind]}
          stroke={LINE}
          strokeOpacity={0.16}
          strokeWidth={0.7}
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
          fill={WOOD}
        />
      ))}

      <g aria-hidden="true">
        {STAIR_XS.map((offset) => (
          <line
            key={`step-${offset}`}
            x1={stairs.x + offset}
            y1={stairs.y + 2}
            x2={stairs.x + offset}
            y2={stairs.y + stairs.height - 2}
            stroke={LINE}
            strokeWidth={1}
            opacity={0.45}
          />
        ))}
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
      fill={primary ? TAUPE : INK}
      className={visibility}
      style={{
        fontSize: primary ? 9.5 : 9,
        letterSpacing: primary ? "0.12em" : "0.1em",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
      }}
    >
      {label.text.toUpperCase()}
    </text>
  );
}
