import { areas } from "@/lib/site";

const SCALE = 10;
const home = areas.find((area) => area.home) ?? areas[0];

/** Schematisk karta som ritas i SVG – inga externa karttjänster eller cookies. */
export function AreaMap() {
  return (
    <svg
      viewBox="-60 -132 620 620"
      role="img"
      aria-label={`Schematisk karta över arbetsområdet med ${home.name} i mitten och ${areas
        .filter((area) => !area.home)
        .map((area) => area.name)
        .join(", ")} runt omkring.`}
      className="h-auto w-full rounded-md border border-line bg-white"
    >
      {[10, 20, 30].map((km) => (
        <g key={km}>
          <circle cx={home.x * SCALE} cy={home.y * SCALE} r={km * SCALE} fill="none" stroke="#12304f" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="5 7" />
          <text x={home.x * SCALE} y={home.y * SCALE + km * SCALE - 8} textAnchor="middle" fontSize="18" fill="#4a5565">
            {km} km
          </text>
        </g>
      ))}
      {areas.map((area) => (
        <g key={area.id}>
          <circle cx={area.x * SCALE} cy={area.y * SCALE} r={area.home ? 10 : 6} fill={area.home ? "#1a56c4" : "#12304f"} stroke="#ffffff" strokeWidth="3" />
          <text
            x={area.x * SCALE + (area.home ? 17 : 12)}
            y={area.y * SCALE - (area.home ? 13 : 9)}
            fontSize={area.home ? 28 : 24}
            fontWeight="600"
            fill="#0d1b2a"
            fontFamily="var(--font-inter), system-ui, sans-serif"
          >
            {area.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Lokala avsnitt per ort (lokal SEO). */
export function AreaList() {
  return (
    <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((area) => (
        <li key={area.id} id={`malare-${area.id}`} className="border-t border-line pt-4">
          <h3 className="text-lg">Målare i {area.name}</h3>
          <p className="mt-2 text-[0.95rem] text-muted">{area.text}</p>
        </li>
      ))}
    </ul>
  );
}
