import type { KeyboardEvent } from "react";
import type { Shelf } from "@/types";
import { floorPlan } from "@/data/shelves";

interface FloorPlanProps {
  shelves: Shelf[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

// Architectural drawing units — shelves sit inside larger cells so aisles read.
const MARGIN = 48;
const CW = 92;
const CH = 70;
const GX = 20;
const GY = 24;
const W = MARGIN * 2 + floorPlan.cols * CW + (floorPlan.cols - 1) * GX;
const H = MARGIN * 2 + floorPlan.rows * CH + (floorPlan.rows - 1) * GY + 18;

const cellX = (col: number) => MARGIN + col * (CW + GX);
const cellY = (row: number) => MARGIN + row * (CH + GY);

const SHELF_INSET_X = 10;
const SHELF_INSET_Y = 12;

export function FloorPlan({ shelves, selectedId, onSelect }: FloorPlanProps) {
  const entranceX = cellX(floorPlan.entrance.col);
  const checkoutX = cellX(floorPlan.checkout.col);
  const lastRowY = cellY(floorPlan.rows - 1);
  const wall = { x: 22, y: 22, w: W - 44, h: H - 40 };

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[340px] bg-warm"
        style={{ fontFamily: "var(--font-hanken)" }}
        role="group"
        aria-label="Grundriss des Stores mit auswählbaren Regalen"
      >
        <defs>
          <pattern
            id="occupied-hatch"
            width="6"
            height="6"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="rgba(41,40,39,0.18)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>

        {/* Floor plate */}
        <rect
          x={wall.x}
          y={wall.y}
          width={wall.w}
          height={wall.h}
          fill="#f4efe7"
        />

        {/* Outer wall */}
        <rect
          x={wall.x}
          y={wall.y}
          width={wall.w}
          height={wall.h}
          fill="none"
          stroke="#292827"
          strokeWidth={1.15}
        />

        {/* Corner ticks — a quiet architectural cue */}
        {[
          [wall.x, wall.y],
          [wall.x + wall.w, wall.y],
          [wall.x, wall.y + wall.h],
          [wall.x + wall.w, wall.y + wall.h],
        ].map(([cx, cy], i) => (
          <g key={i} stroke="#292827" strokeWidth={0.9}>
            <line
              x1={cx}
              y1={cy}
              x2={cx + (i % 2 === 0 ? 8 : -8)}
              y2={cy}
            />
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy + (i < 2 ? 8 : -8)}
            />
          </g>
        ))}

        {/* Entrance opening in the south wall */}
        <rect
          x={entranceX + 6}
          y={wall.y + wall.h - 1.2}
          width={CW - 12}
          height={3.2}
          fill="#f7f5f1"
        />
        <text
          x={entranceX + CW / 2}
          y={H - 6}
          textAnchor="middle"
          className="fill-muted"
          style={{ fontSize: 9, letterSpacing: "0.18em" }}
        >
          EINGANG
        </text>

        {/* Checkout as a thin counter, not a full cell */}
        <rect
          x={checkoutX + 4}
          y={lastRowY + 18}
          width={CW - 8}
          height={14}
          fill="#e2d8c9"
          stroke="rgba(41,40,39,0.28)"
          strokeWidth={0.8}
        />
        <text
          x={checkoutX + CW / 2}
          y={lastRowY + 10}
          textAnchor="middle"
          className="fill-muted"
          style={{ fontSize: 9, letterSpacing: "0.18em" }}
        >
          KASSE
        </text>

        {shelves.map((shelf) => {
          const x = cellX(shelf.col) + SHELF_INSET_X;
          const y = cellY(shelf.row) + SHELF_INSET_Y;
          const w = CW - SHELF_INSET_X * 2;
          const h = CH - SHELF_INSET_Y * 2;
          const isSelected = selectedId === shelf.id;
          const isOccupied = shelf.status === "occupied";
          const interactive = !isOccupied;

          const fill = isSelected
            ? "#292827"
            : isOccupied
              ? "#e8dfd2"
              : "#f7f5f1";
          const stroke = isSelected
            ? "#292827"
            : isOccupied
              ? "rgba(41,40,39,0.22)"
              : "#292827";
          const labelFill = isSelected
            ? "#f7f5f1"
            : isOccupied
              ? "#7d7973"
              : "#292827";

          const handleKeyDown = (event: KeyboardEvent<SVGGElement>) => {
            if (!interactive) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelect(shelf.id);
            }
          };

          return (
            <g
              key={shelf.id}
              role="button"
              aria-label={`Regal ${shelf.id}${
                shelf.hint ? `, ${shelf.hint}` : ""
              } – ${isOccupied ? "belegt" : "verfügbar"}${
                isSelected ? ", ausgewählt" : ""
              }`}
              aria-disabled={isOccupied || undefined}
              aria-pressed={interactive ? isSelected : undefined}
              tabIndex={interactive ? 0 : -1}
              onClick={() => interactive && onSelect(shelf.id)}
              onKeyDown={handleKeyDown}
              className="outline-none [&:focus-visible_rect]:stroke-taupe-ink [&:focus-visible_rect]:[stroke-width:2]"
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={1}
                fill={fill}
                stroke={stroke}
                strokeWidth={1}
                className={
                  interactive && !isSelected
                    ? "cursor-pointer transition-[fill] duration-300 hover:fill-[#ece5db]"
                    : isOccupied
                      ? "cursor-default"
                      : "cursor-pointer"
                }
              />
              {isOccupied ? (
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx={1}
                  fill="url(#occupied-hatch)"
                  stroke="none"
                  pointerEvents="none"
                />
              ) : null}
              <text
                x={x + w / 2}
                y={y + h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={labelFill}
                style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.08em" }}
                pointerEvents="none"
              >
                {shelf.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
