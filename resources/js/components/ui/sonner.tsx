import { Toaster, type ToasterProps } from "sonner"
import { useTheme } from "@/lib/use-theme"

const Toast = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  return (
    <Toaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      toastOptions={{
        className:
          "*:[svg]:self-start *:[svg]:shrink-0 font-sans rounded-lg! has-data-description:*:[svg]:mt-1 *:[svg]:mt-0.5 backdrop-blur-2xl",
      }}
      {...props}
    />
  )
}

export { Toast }
export type { ToasterProps }
