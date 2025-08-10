import { type HTMLAttributes, useId } from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  shape?: "square" | "circle"
}

const Skeleton = ({ shape, className, ...props }: SkeletonProps) => {
  const patternId = useId()
  return (
    <div
      style={{ opacity: 0.9 }}
      className={cn(
        "relative shrink-0 animate-pulse overflow-hidden border",
        shape === "circle" ? "rounded-full" : "rounded-sm",
        className,
      )}
      {...props}
    >
      <svg className="absolute inset-0 size-full stroke-border" fill="none">
        <defs>
          <pattern id={patternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
          </pattern>
        </defs>
        <rect stroke="none" fill={`url(#${patternId})`} width="100%" height="100%" />
      </svg>
    </div>
  )
}

export { Skeleton }
