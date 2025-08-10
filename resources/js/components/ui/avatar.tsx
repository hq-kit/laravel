import { Collection, type CollectionProps } from "@react-aria/collections"
import { IconUser } from "@tabler/icons-react"
import { type ComponentProps, useEffect, useState } from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/lib/utils"

interface AvatarGroupProps<T extends object> extends CollectionProps<T> {
  className?: string
}

const getInitials = (name: string): string =>
  name.split(" ").slice(0, 2).length > 1
    ? name
        .split(" ")
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join("")
    : name.split("").slice(0, 2).join("")

const AvatarGroup = <T extends object>({ className, ...props }: AvatarGroupProps<T>) => {
  return (
    <div
      className={cn(
        "-space-x-2 flex items-center justify-center **:data-avatar:ring **:data-avatar:ring-border",
        "**:data-avatar:transition-transform **:data-avatar:hover:z-30 **:data-avatar:hover:scale-110",
        className,
      )}
    >
      <Collection {...props} />
    </div>
  )
}

const avatarStyle = tv({
  base: [
    "inline-grid shrink-0 items-center justify-center align-middle *:col-start-1 *:row-start-1",
    "-outline-offset-1 text-center outline-1 outline-foreground/20",
  ],
  variants: {
    shape: {
      square: "rounded-lg *:rounded-lg",
      circle: "rounded-full *:rounded-full",
    },
    size: {
      xs: "size-6",
      sm: "size-7",
      md: "size-8",
      lg: "size-9",
      xl: "size-12",
      "2xl": "size-14",
      "3xl": "size-16",
      "4xl": "size-20",
      "5xl": "size-24",
    },
  },
  defaultVariants: {
    shape: "circle",
    size: "lg",
  },
})

interface AvatarProps extends VariantProps<typeof avatarStyle> {
  src?: string | undefined
  alt?: string
  className?: string
}

const Avatar = ({
  src,
  shape,
  size,
  alt,
  className,
  ...props
}: AvatarProps & ComponentProps<"img">) => {
  const [error, setError] = useState(!src)

  function handleError() {
    setError(true)
  }

  useEffect(() => {
    setError(!src)
  }, [src])

  if (error) {
    return (
      <span data-avatar={true} className={avatarStyle({ shape, size, className })}>
        <FallbackImage alt={alt} />
      </span>
    )
  }
  return (
    <img
      src={src}
      alt={alt || "Avatar"}
      onError={handleError}
      data-avatar
      className={avatarStyle({ shape, size, className })}
      {...props}
    />
  )
}

const FallbackImage = ({ alt }: { alt: string | undefined }) => {
  return alt ? (
    <svg
      className="size-full select-none bg-background fill-current p-[5%] font-medium text-[48px] uppercase"
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {alt && <title>{alt}</title>}
      <text
        x="50%"
        y="50%"
        alignmentBaseline="middle"
        dominantBaseline="middle"
        textAnchor="middle"
        dy=".125em"
      >
        {getInitials(alt)}
      </text>
    </svg>
  ) : (
    <IconUser className="size-full place-self-center bg-background p-1.5" />
  )
}

export { Avatar, AvatarGroup }
export type { AvatarProps }
