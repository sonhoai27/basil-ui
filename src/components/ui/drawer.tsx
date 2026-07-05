import * as React from "react"

import { cn } from "../../lib/utils"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

/**
 * Drawer — panel trượt từ CẠNH màn hình (mặc định bên phải), KHÔNG phải bottom sheet.
 * Dựng trên Sheet (Radix Dialog) để tin cậy; đổi `side` để trượt từ cạnh khác.
 */
const Drawer = Sheet
const DrawerTrigger = SheetTrigger
const DrawerClose = SheetClose
const DrawerPortal = SheetPortal
const DrawerOverlay = SheetOverlay
const DrawerTitle = SheetTitle
const DrawerDescription = SheetDescription

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof SheetContent>,
  React.ComponentPropsWithoutRef<typeof SheetContent>
>(({ side = "right", className, ...props }, ref) => (
  <SheetContent
    ref={ref}
    side={side}
    className={cn("flex flex-col gap-0 p-0", className)}
    {...props}
  />
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 border-b border-border p-5", className)} {...props} />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 border-t border-border p-5", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
