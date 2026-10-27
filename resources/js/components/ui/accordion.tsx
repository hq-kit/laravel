

import type { ReactNode } from "react"
import { IconChevronDown } from "@tabler/icons-react"
import { cn } from "cn"
import {
  Button,
  type ButtonProps,
  Disclosure,
  DisclosureGroup,
  type DisclosureGroupProps,
  DisclosurePanel,
  type DisclosurePanelProps,
  type DisclosureProps,
  Heading
} from "react-aria-components/DisclosureGroup"

const Accordion = ({ className, ...props }: DisclosureGroupProps) => (
  <DisclosureGroup className={cn("flex w-full flex-col", className)} data-slot="accordion" {...props} />
)

const AccordionItem = ({ className, ...props }: DisclosureProps) => (
  <Disclosure className={cn("not-last:border-b", className)} data-slot="accordion-item" {...props} />
)

const AccordionTrigger = ({
  className,
  children,
  ...props
}: Omit<ButtonProps, "children"> & { children: ReactNode }) => (
  <Heading className="flex">
    <Button
      className={cn(
        "focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4",
        className
      )}
      data-slot="accordion-trigger"
      slot="trigger"
      {...props}
    >
      {children}
      <IconChevronDown
        className="pointer-events-none shrink-0 transition-transform group-aria-expanded/accordion-trigger:rotate-180"
        data-slot="accordion-trigger-icon"
      />
    </Button>
  </Heading>
)

const AccordionContent = ({ className, children, ...props }: DisclosurePanelProps) => (
  <DisclosurePanel
    className="data-open:animate-accordion-down data-closed:animate-accordion-up h-(--disclosure-panel-height) overflow-clip text-sm transition-[height]"
    data-slot="accordion-content"
    {...props}
  >
    <div
      className={cn(
        "[&_a]:hover:text-foreground pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
        className
      )}
    >
      {children}
    </div>
  </DisclosurePanel>
)

Accordion.Content = AccordionContent
Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
