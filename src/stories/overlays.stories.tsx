import * as React from 'react';
import type { Story } from '@ladle/react';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  ConfirmDialog,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  KebabMenu,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  Input,
  Label,
  Textarea,
  Separator,
} from '../index';
import {
  Pencil,
  Trash2,
  Copy,
  Printer,
  CheckCircle2,
  XCircle,
  Info,
  MoreHorizontal,
  Package,
  Users,
  ShoppingCart,
  FileText,
  Truck,
} from 'lucide-react';

export default { title: 'Overlays' };

const Label_ = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{children}</p>
);

/* ------------------------------------------------------------------ */
/* Dialog                                                              */
/* ------------------------------------------------------------------ */
export const DialogStory: Story = () => (
  <div className="space-y-3">
    <Label_>Dialog — edit order (uncontrolled, Radix Trigger)</Label_>
    <Dialog>
      <DialogTrigger asChild>
        <Button leadingIcon={<Pencil className="size-4" />}>Edit order ORD-2401</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit order ORD-2401</DialogTitle>
          <DialogDescription>
            Emma Carter · The Noodle Bar · deliver tomorrow morning. Update the details, then save.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          <div className="space-y-1.5">
            <Label htmlFor="dlg-customer">Customer</Label>
            <Input id="dlg-customer" defaultValue="Emma Carter · The Noodle Bar" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dlg-note">Delivery note</Label>
            <Textarea id="dlg-note" defaultValue="Deliver before 7am, call ahead on arrival." rows={3} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <span className="text-sm text-muted-foreground">Order total</span>
            <span className="font-tabular text-sm font-semibold">$1,250.00</span>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
);

/* ------------------------------------------------------------------ */
/* AlertDialog + domain ConfirmDialog                                  */
/* ------------------------------------------------------------------ */
export const AlertAndConfirm: Story = () => {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleConfirm = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setConfirmOpen(false);
    }, 1200);
  };

  return (
    <div className="flex flex-wrap items-start gap-8">
      <div className="space-y-3">
        <Label_>AlertDialog — destructive (Radix Trigger)</Label_>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" leadingIcon={<Trash2 className="size-4" />}>
              Delete product
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete "Pork Ham" from inventory?</AlertDialogTitle>
              <AlertDialogDescription>
                The product will be removed from the catalog. Past orders stay intact. This can't be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep it</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="space-y-3">
        <Label_>ConfirmDialog — domain (controlled, with isLoading)</Label_>
        <Button
          variant="destructive"
          leadingIcon={<XCircle className="size-4" />}
          onClick={() => setConfirmOpen(true)}
        >
          Cancel order ORD-2401
        </Button>
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Cancel order ORD-2401?"
          description="Emma Carter · The Noodle Bar · $1,250.00. Cancelling restocks inventory and notifies the customer."
          confirmLabel="Cancel order"
          cancelLabel="Keep order"
          destructive
          isLoading={confirmLoading}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Sheet + Drawer                                                      */
/* ------------------------------------------------------------------ */
export const SheetAndDrawer: Story = () => (
  <div className="flex flex-wrap items-start gap-8">
    <div className="space-y-3">
      <Label_>Sheet — right panel (customer detail)</Label_>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" leadingIcon={<Users className="size-4" />}>
            View customer
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Emma Carter · The Noodle Bar</SheetTitle>
            <SheetDescription>Wholesale customer · current balance</SheetDescription>
          </SheetHeader>

          <div className="space-y-3 py-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-tabular">(0912) 345 678</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Orders this month</span>
              <span className="font-tabular">18 orders</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Outstanding balance</span>
              <span className="font-tabular font-semibold">$3,480.00</span>
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button leadingIcon={<ShoppingCart className="size-4" />}>New order</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>

    <div className="space-y-3">
      <Label_>Drawer — form panel (side=right, bordered header/footer)</Label_>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" leadingIcon={<Pencil className="size-4" />}>
            Edit product
          </Button>
        </DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Edit product</DrawerTitle>
            <DrawerDescription>Pork Ham · SKU-0042</DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            <div className="space-y-1.5">
              <Label htmlFor="drw-name">Product name</Label>
              <Input id="drw-name" defaultValue="Pork Ham" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="drw-price">Wholesale price ($/kg)</Label>
              <Input id="drw-price" className="font-tabular" defaultValue="18.00" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="drw-stock">In stock (kg)</Label>
              <Input id="drw-stock" className="font-tabular" defaultValue="42" />
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" fullWidth>
                Cancel
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button fullWidth>Save</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Popover                                                             */
/* ------------------------------------------------------------------ */
export const PopoverStory: Story = () => (
  <div className="space-y-3">
    <Label_>Popover — quick adjust (Radix Trigger)</Label_>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" leadingIcon={<Truck className="size-4" />}>
          Delivery date
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Delivery schedule — ORD-2401</p>
            <p className="text-xs text-muted-foreground">
              Pick a date &amp; time window for Emma Carter · The Noodle Bar.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pop-date">Delivery date</Label>
            <Input id="pop-date" type="date" defaultValue="2026-07-06" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pop-slot">Time window</Label>
            <Input id="pop-slot" defaultValue="06:00 – 07:00" />
          </div>
          <Button fullWidth size="sm">
            Save schedule
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  </div>
);

/* ------------------------------------------------------------------ */
/* DropdownMenu + Kebab                                                 */
/* ------------------------------------------------------------------ */
export const DropdownAndKebab: Story = () => (
  <div className="flex flex-wrap items-start gap-8">
    <div className="space-y-3">
      <Label_>DropdownMenu — bulk actions (3 orders selected)</Label_>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" trailingIcon={<MoreHorizontal className="size-4" />}>
            Actions · 3 orders
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>3 orders selected</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <CheckCircle2 className="size-4" />
            Mark as paid
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Printer className="size-4" />
            Print packing slips
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="size-4" />
            Export to Excel
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Show columns</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked>Balance</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Delivery date</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Tax</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="size-4" />
            Cancel 3 orders
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div className="space-y-3">
      <Label_>KebabMenu — overflow for a single order row</Label_>
      <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
        <span className="font-tabular text-sm font-medium">ORD-2402</span>
        <span className="text-sm text-muted-foreground">Tom Baker · The Canteen</span>
        <span className="font-tabular ml-4 text-sm">$890.00</span>
        <div className="ml-2">
          <KebabMenu
            items={[
              { label: 'Edit order', icon: <Pencil className="size-4" />, onSelect: () => {} },
              { label: 'Duplicate', icon: <Copy className="size-4" />, onSelect: () => {} },
              { label: 'Print slip', icon: <Printer className="size-4" />, onSelect: () => {} },
              {
                label: 'Cancel order',
                icon: <Trash2 className="size-4" />,
                destructive: true,
                onSelect: () => {},
              },
            ]}
          />
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Tooltip                                                             */
/* ------------------------------------------------------------------ */
export const TooltipStory: Story = () => (
  <TooltipProvider delayDuration={150}>
    <div className="space-y-3">
      <Label_>Tooltip — on icon buttons (wrap in TooltipProvider)</Label_>
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Print packing slip">
              <Printer className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Print packing slip</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Duplicate order">
              <Copy className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Duplicate order</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Balance info">
              <Info className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Outstanding balance: $3,480.00</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="destructive" aria-label="Cancel order">
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Cancel order ORD-2401</TooltipContent>
        </Tooltip>
      </div>
    </div>
  </TooltipProvider>
);

/* ------------------------------------------------------------------ */
/* Command palette                                                     */
/* ------------------------------------------------------------------ */
export const CommandPalette: Story = () => (
  <div className="space-y-3">
    <Label_>Command — grouped command palette (inline)</Label_>
    <div className="max-w-md rounded-xl border border-border shadow-popover">
      <Command>
        <CommandInput placeholder="Search orders, customers, products, or commands…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Orders">
            <CommandItem>
              <ShoppingCart className="size-4" />
              New order
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileText className="size-4" />
              ORD-2401 · Emma Carter · The Noodle Bar
            </CommandItem>
            <CommandItem>
              <FileText className="size-4" />
              ORD-2402 · Tom Baker · The Canteen
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Products">
            <CommandItem>
              <Package className="size-4" />
              Pork Ham
            </CommandItem>
            <CommandItem>
              <Package className="size-4" />
              Fermented Pork Roll
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Customers">
            <CommandItem>
              <Users className="size-4" />
              Emma Carter · The Noodle Bar
            </CommandItem>
            <CommandItem disabled>
              <Truck className="size-4" />
              Stock intake (under maintenance)
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  </div>
);
