import { Avatar, type AvatarProps } from "./avatar"

interface UserProps extends Omit<AvatarProps, "size"> {
  name: string
  description?: string
  size?: "md" | "lg" | "xl"
}

const User = ({ name, description, size = "lg", ...props }: UserProps) => {
  const sizes: { avatar: "lg" | "md" | "xl"; name: string; description: string } = {
    avatar: "lg",
    name: "text-sm",
    description: "text-xs",
  }
  switch (size) {
    case "md":
      sizes.avatar = "md"
      sizes.name = "text-sm"
      sizes.description = "text-xs"
      break
    case "xl":
      sizes.avatar = "xl"
      sizes.name = "text-base"
      sizes.description = "text-sm"
      break
    default:
      sizes.avatar = "lg"
      sizes.name = "text-sm"
      sizes.description = "text-xs"
      break
  }
  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-xl outline-none">
      <Avatar {...props} size={sizes.avatar} />
      <div data-user={true} className="inline-flex flex-col items-start">
        <span className={`font-medium text-inherit ${sizes.name}`}>{name}</span>
        {description && (
          <span className={`text-muted-foreground ${sizes.description}`}>{description}</span>
        )}
      </div>
    </div>
  )
}

export { User }
