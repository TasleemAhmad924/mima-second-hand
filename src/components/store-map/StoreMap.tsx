"use client";

/**
 * Visual store explorer. Not a booking selector.
 * No occupancy colours, no guaranteed shelf pick.
 */
import { PLAN_IMAGE, STORE_LAYOUT, STORE_MAP_TRACE } from "@/data/store-layout";
import type { ShelfRow, StructuralArea } from "@/lib/store-map/types";

interface StoreMapProps {
  focusId?: string | null;
  onFocus?: (id: string) => void;
  /** Development overlay of the scanned drawing. Never on in public UI. */
  showReference?: boolean;
}

function outlinePath(points: readonly [number, number][]): string {
  return `${points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
    .join(" ")} Z`;
}

function linePath(points: readonly [number, number][]): string {
  return points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`)
    .join(" ");
}

function rowCenter(item: ShelfRow): { cx: number; cy: number } {
  return { cx: item.x + item.width / 2, cy: item.y + item.height / 2 };
}

function bayRects(item: ShelfRow): { x: number; y: number; width: number; height: number }[] {
  const gap = 0.7;
  const n = Math.max(1, item.unitCount);
  const ns = item.orientation === "ns";
  return Array.from({ length: n }, (_, i) => {
    if (ns) {
      const h = item.height / n;
      return {
        x: item.x,
        y: item.y + i * h,
        width: item.width,
        height: Math.max(h - gap, 1.15),
      };
    }
    const w = item.width / n;
    return {
      x: item.x + i * w,
      y: item.y,
      width: Math.max(w - gap, 1.15),
      height: item.height,
    };
  });
}

function isFocused(
  focusId: string | null | undefined,
  id: string,
  zoneId?: string,
) {
  if (!focusId) return false;
  if (focusId === id || focusId === zoneId) return true;
  if (focusId === "fixture-play" && zoneId === "zone-sued") return true;
  return false;
}

export function StoreMap({
  focusId = null,
  onFocus,
  showReference = STORE_MAP_TRACE,
}: StoreMapProps) {
  const { viewBox, outline, partitions, rows, fixtures, zones } = STORE_LAYOUT;
  const tracing = showReference;

  return (
    <svg
      viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Grundriss des Second-Hand-Ladens von MiMa in Stockelsdorf. Unregelmäßiger Raum mit Mittelgängen, Wandregalen, Küche, WC, Umkleide und Spielecke."
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <defs>
        <pattern
          id="mima-shelf-wood"
          width="7"
          height="7"
          patternTransform="rotate(42)"
          patternUnits="userSpaceOnUse"
        >
          <rect width="7" height="7" fill="#cbb89a" />
          <path
            d="M0 7 L7 0"
            stroke="rgba(44,41,38,0.16)"
            strokeWidth="0.65"
          />
        </pattern>
      </defs>

      {tracing ? (
        <>
          <image
            href={PLAN_IMAGE.src}
            x={0}
            y={0}
            width={PLAN_IMAGE.width}
            height={PLAN_IMAGE.height}
            opacity={0.55}
            preserveAspectRatio="none"
          />
          {Array.from({ length: 10 }, (_, i) => {
            const x = (i / 10) * PLAN_IMAGE.width;
            const y = (i / 10) * PLAN_IMAGE.height;
            return (
              <g key={`grid-${i}`} pointerEvents="none">
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={PLAN_IMAGE.height}
                  stroke="rgba(180,40,40,0.22)"
                  strokeWidth={0.6}
                />
                <line
                  x1={0}
                  y1={y}
                  x2={PLAN_IMAGE.width}
                  y2={y}
                  stroke="rgba(180,40,40,0.22)"
                  strokeWidth={0.6}
                />
              </g>
            );
          })}
        </>
      ) : null}

      <path
        d={outlinePath(outline)}
        fill={tracing ? "rgba(247,242,232,0.12)" : "#f7f2e8"}
        stroke="#2c2926"
        strokeWidth={1.7}
        strokeLinejoin="miter"
      />

      {partitions.map((points, index) => (
        <path
          key={`partition-${index}`}
          d={linePath(points)}
          fill="none"
          stroke="#2c2926"
          strokeWidth={1.35}
          strokeLinejoin="miter"
        />
      ))}

      {fixtures.map((fixture) => (
        <FixtureMark
          key={fixture.id}
          fixture={fixture}
          active={isFocused(focusId, fixture.id)}
          onFocus={onFocus}
          tracing={tracing}
        />
      ))}

      {rows.map((item) => {
        const { cx, cy } = rowCenter(item);
        const active = isFocused(focusId, item.id, item.zoneId);
        const zoneName = zones.find((zone) => zone.id === item.zoneId)?.name;
        return (
          <g
            key={item.id}
            transform={
              item.rotation ? `rotate(${item.rotation} ${cx} ${cy})` : undefined
            }
            opacity={tracing ? 0.45 : 1}
          >
            <title>{`${item.label}${zoneName ? ` · ${zoneName}` : ""}`}</title>
            {bayRects(item).map((bay, index) => (
              <rect
                key={`${item.id}-${index}`}
                x={bay.x}
                y={bay.y}
                width={bay.width}
                height={bay.height}
                fill="url(#mima-shelf-wood)"
                stroke={active ? "#2c2926" : "#8a6a48"}
                strokeWidth={active ? 1.2 : 0.55}
                className={onFocus ? "cursor-pointer" : undefined}
                onClick={() => onFocus?.(item.zoneId)}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function FixtureMark({
  fixture,
  active,
  onFocus,
  tracing,
}: {
  fixture: StructuralArea;
  active: boolean;
  onFocus?: (id: string) => void;
  tracing: boolean;
}) {
  const fill = active ? "#e8ddcf" : tracing ? "rgba(239,230,216,0.22)" : "#efe6d8";
  const stroke = active ? "#2c2926" : "rgba(44,41,38,0.32)";
  const cx = fixture.x + fixture.width / 2;
  const cy = fixture.y + fixture.height / 2;
  const labelStyle = {
    fontSize: 12,
    letterSpacing: "0.04em",
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
  } as const;

  if (fixture.kind === "column") {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={fixture.width / 2}
        fill="#d8cbb8"
        stroke="#2c2926"
        strokeWidth={1}
      />
    );
  }

  if (fixture.kind === "note") {
    return (
      <rect
        x={fixture.x}
        y={fixture.y}
        width={fixture.width}
        height={fixture.height}
        fill={tracing ? "rgba(216,203,184,0.35)" : "#e4d8c6"}
        stroke="rgba(44,41,38,0.28)"
        strokeWidth={0.7}
      />
    );
  }

  if (fixture.kind === "stairs") {
    const steps = 8;
    return (
      <g
        transform={
          fixture.rotation ? `rotate(${fixture.rotation} ${cx} ${cy})` : undefined
        }
        opacity={tracing ? 0.7 : 1}
      >
        {Array.from({ length: steps }, (_, index) => (
          <line
            key={index}
            x1={fixture.x + (index * fixture.width) / (steps - 1)}
            y1={fixture.y}
            x2={fixture.x + (index * fixture.width) / (steps - 1)}
            y2={fixture.y + fixture.height}
            stroke="rgba(44,41,38,0.45)"
            strokeWidth={1.05}
          />
        ))}
        {fixture.label ? (
          <text
            x={cx}
            y={cy + 3}
            textAnchor="middle"
            fill="#8a6a48"
            style={labelStyle}
          >
            {fixture.label}
          </text>
        ) : null}
      </g>
    );
  }

  if (fixture.shape === "label") {
    return (
      <g
        className={onFocus ? "cursor-pointer" : undefined}
        onClick={() => onFocus?.(fixture.id)}
      >
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          fill={active ? "#2c2926" : "#6b655c"}
          style={labelStyle}
        >
          {fixture.label}
        </text>
      </g>
    );
  }

  const path = fixture.points?.length ? outlinePath(fixture.points) : null;

  return (
    <g
      className={onFocus ? "cursor-pointer" : undefined}
      onClick={() => onFocus?.(fixture.id)}
      opacity={tracing ? 0.5 : 1}
    >
      {path ? (
        <path d={path} fill={fill} stroke={stroke} strokeWidth={active ? 1.5 : 0.9} />
      ) : (
        <rect
          x={fixture.x}
          y={fixture.y}
          width={fixture.width}
          height={fixture.height}
          fill={fill}
          stroke={stroke}
          strokeWidth={active ? 1.5 : 0.9}
        />
      )}
      {fixture.label ? (
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fill="#2c2926"
          style={labelStyle}
        >
          {fixture.label}
        </text>
      ) : null}
    </g>
  );
}
