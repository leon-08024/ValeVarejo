import { useId } from "react"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"

export interface ChartDatum {
  label: string
  value: number
}

const PALETTE = [
  "#a02e42",
  "#c29a4b",
  "#567a92",
  "#cc7a3e",
  "#c05a36",
  "#6d1c2c",
  "#d26778",
  "#41667d",
]

export function BarsChart({ data }: { data: ChartDatum[] }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="flex h-48 items-end gap-2">
      {data.map((d, i) => (
        <div key={d.label} className="group flex flex-1 flex-col items-center gap-2">
          <div className="relative flex w-full flex-1 items-end justify-center">
            <div
              className={cn(
                "w-full rounded-t-sm transition-all duration-300 group-hover:opacity-80",
                i % 2 === 0 ? "bg-pine-600" : "bg-pine-400"
              )}
              style={{ height: `${(d.value / max) * 100}%` }}
            />
            <span className="pointer-events-none absolute -top-7 rounded-md bg-foreground px-2 py-0.5 text-xs font-bold whitespace-nowrap text-background opacity-0 transition-opacity group-hover:opacity-100">
              {formatPrice(d.value)}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export function AreaChart({ data }: { data: ChartDatum[] }) {
  const gradientId = useId()
  const W = 320
  const H = 130
  const max = Math.max(...data.map((d) => d.value), 1)
  const stepX = W / (data.length - 1)
  const points = data.map((d, i) => `${i * stepX},${H - (d.value / max) * (H - 10)}`)
  const line = points.join(" ")
  const area = `0,${H} ${line} ${W},${H}`

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-44 w-full text-pine-600"
        role="img"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#${gradientId})`} />
        <polyline
          points={line}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((d, i) => (
          <g key={d.label}>
            <circle
              cx={i * stepX}
              cy={H - (d.value / max) * (H - 10)}
              r="3.5"
              className="fill-background stroke-pine-600"
              strokeWidth="2"
            />
            <title>{`${d.label}: ${formatPrice(d.value)}`}</title>
          </g>
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}

export function DonutChart({
  data,
  totalLabel = "Total",
}: {
  data: ChartDatum[]
  totalLabel?: string
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1
  const R = 42
  const C = 2 * Math.PI * R
  let acc = 0

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
      <div className="relative">
        <svg viewBox="0 0 120 120" className="size-44 -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            strokeWidth="16"
            className="stroke-muted"
          />
          {data.map((d, i) => {
            const frac = d.value / total
            const dash = `${(frac * C).toFixed(2)} ${C.toFixed(2)}`
            const offset = (-acc * C).toFixed(2)
            acc += frac
            return (
              <circle
                key={d.label}
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth="16"
                strokeDasharray={dash}
                strokeDashoffset={offset}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold">{total}</span>
          <span className="text-[10px] text-muted-foreground">{totalLabel}</span>
        </div>
      </div>
      <ul className="space-y-1.5">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2 text-sm">
            <span
              className="size-3 shrink-0 rounded-sm"
              style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
            />
            <span className="text-muted-foreground">{d.label}</span>
            <span className="ml-auto pl-4 font-bold">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}