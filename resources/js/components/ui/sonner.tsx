import { useTheme } from "next-themes"
import { Toaster, type ToasterProps } from "sonner"

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
      style={
        {
          "--normal-background": "var(--color-background)",
          "--normal-text": "var(--color-foreground)",
          "--normal-border": "var(--color-muted)",

          "--success-background": "var(--color-success-background)",
          "--success-border": "var(--color-success-border)",
          "--success-text": "var(--color-success-foreground)",

          "--error-background": "var(--color-error-background)",
          "--error-border": "var(--color-error-border)",
          "--error-text": "var(--color-error-foreground)",

          "--warning-background": "var(--color-warning-background)",
          "--warning-border": "var(--color-warning-border)",
          "--warning-text": "var(--color-warning-foreground)",

          "--info-background": "var(--color-info-background)",
          "--info-border": "var(--color-info-border)",
          "--info-text": "var(--color-info-foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toast }
export type { ToasterProps }
