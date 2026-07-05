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
    <Label_>Dialog — sửa đơn (uncontrolled, Radix Trigger)</Label_>
    <Dialog>
      <DialogTrigger asChild>
        <Button leadingIcon={<Pencil className="size-4" />}>Sửa đơn DH-2401</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sửa đơn DH-2401</DialogTitle>
          <DialogDescription>
            Chị Lan · Quán bún · giao sáng mai. Cập nhật thông tin rồi lưu lại.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          <div className="space-y-1.5">
            <Label htmlFor="dlg-customer">Khách hàng</Label>
            <Input id="dlg-customer" defaultValue="Chị Lan · Quán bún" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dlg-note">Ghi chú giao hàng</Label>
            <Textarea id="dlg-note" defaultValue="Giao trước 7h, gọi trước khi tới." rows={3} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
            <span className="text-sm text-muted-foreground">Tổng đơn</span>
            <span className="font-tabular text-sm font-semibold">1.250.000₫</span>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Huỷ</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Lưu thay đổi</Button>
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
              Xoá sản phẩm
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xoá "Chả lụa" khỏi kho?</AlertDialogTitle>
              <AlertDialogDescription>
                Sản phẩm sẽ bị gỡ khỏi danh mục. Các đơn cũ vẫn giữ nguyên. Không thể hoàn tác.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Giữ lại</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Xoá</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="space-y-3">
        <Label_>ConfirmDialog — domain (controlled, có isLoading)</Label_>
        <Button
          variant="destructive"
          leadingIcon={<XCircle className="size-4" />}
          onClick={() => setConfirmOpen(true)}
        >
          Huỷ đơn DH-2401
        </Button>
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Huỷ đơn DH-2401?"
          description="Chị Lan · Quán bún · 1.250.000₫. Huỷ đơn sẽ hoàn kho và thông báo cho khách."
          confirmLabel="Huỷ đơn"
          cancelLabel="Không huỷ"
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
      <Label_>Sheet — panel phải (chi tiết khách)</Label_>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" leadingIcon={<Users className="size-4" />}>
            Xem khách hàng
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Chị Lan · Quán bún</SheetTitle>
            <SheetDescription>Khách sỉ · công nợ hiện tại</SheetDescription>
          </SheetHeader>

          <div className="space-y-3 py-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Điện thoại</span>
              <span className="font-tabular">0912 345 678</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Đơn tháng này</span>
              <span className="font-tabular">18 đơn</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Công nợ</span>
              <span className="font-tabular font-semibold">3.480.000₫</span>
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Đóng</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button leadingIcon={<ShoppingCart className="size-4" />}>Tạo đơn mới</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>

    <div className="space-y-3">
      <Label_>Drawer — form panel (side=right, header/footer bo viền)</Label_>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" leadingIcon={<Pencil className="size-4" />}>
            Sửa sản phẩm
          </Button>
        </DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Sửa sản phẩm</DrawerTitle>
            <DrawerDescription>Chả lụa · SP-0042</DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            <div className="space-y-1.5">
              <Label htmlFor="drw-name">Tên sản phẩm</Label>
              <Input id="drw-name" defaultValue="Chả lụa" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="drw-price">Giá sỉ (₫/kg)</Label>
              <Input id="drw-price" className="font-tabular" defaultValue="180.000" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="drw-stock">Tồn kho (kg)</Label>
              <Input id="drw-stock" className="font-tabular" defaultValue="42" />
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" fullWidth>
                Huỷ
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button fullWidth>Lưu</Button>
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
    <Label_>Popover — điều chỉnh nhanh (Radix Trigger)</Label_>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" leadingIcon={<Truck className="size-4" />}>
          Ngày giao
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Lịch giao — DH-2401</p>
            <p className="text-xs text-muted-foreground">
              Chọn ngày & khung giờ giao cho Chị Lan · Quán bún.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pop-date">Ngày giao</Label>
            <Input id="pop-date" type="date" defaultValue="2026-07-06" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pop-slot">Khung giờ</Label>
            <Input id="pop-slot" defaultValue="06:00 – 07:00" />
          </div>
          <Button fullWidth size="sm">
            Lưu lịch giao
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
      <Label_>DropdownMenu — thao tác hàng loạt (3 đơn đã chọn)</Label_>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" trailingIcon={<MoreHorizontal className="size-4" />}>
            Thao tác · 3 đơn
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Đã chọn 3 đơn</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <CheckCircle2 className="size-4" />
            Đánh dấu đã thanh toán
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Printer className="size-4" />
            In phiếu giao
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="size-4" />
            Xuất Excel
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Hiển thị cột</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked>Công nợ</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked>Ngày giao</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>VAT</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="size-4" />
            Huỷ 3 đơn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div className="space-y-3">
      <Label_>KebabMenu — overflow của 1 dòng đơn</Label_>
      <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
        <span className="font-tabular text-sm font-medium">DH-2402</span>
        <span className="text-sm text-muted-foreground">Anh Tú · Bếp ăn</span>
        <span className="font-tabular ml-4 text-sm">890.000₫</span>
        <div className="ml-2">
          <KebabMenu
            items={[
              { label: 'Sửa đơn', icon: <Pencil className="size-4" />, onSelect: () => {} },
              { label: 'Nhân bản', icon: <Copy className="size-4" />, onSelect: () => {} },
              { label: 'In phiếu', icon: <Printer className="size-4" />, onSelect: () => {} },
              {
                label: 'Huỷ đơn',
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
      <Label_>Tooltip — trên icon-button (wrap TooltipProvider)</Label_>
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" aria-label="In phiếu giao">
              <Printer className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>In phiếu giao</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Nhân bản đơn">
              <Copy className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Nhân bản đơn</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Thông tin công nợ">
              <Info className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Công nợ còn lại: 3.480.000₫</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="destructive" aria-label="Huỷ đơn">
              <Trash2 className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Huỷ đơn DH-2401</TooltipContent>
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
    <Label_>Command — bảng lệnh nhóm (inline)</Label_>
    <div className="max-w-md rounded-xl border border-border shadow-popover">
      <Command>
        <CommandInput placeholder="Tìm đơn, khách, sản phẩm hoặc lệnh…" />
        <CommandList>
          <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>

          <CommandGroup heading="Đơn hàng">
            <CommandItem>
              <ShoppingCart className="size-4" />
              Tạo đơn mới
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileText className="size-4" />
              DH-2401 · Chị Lan · Quán bún
            </CommandItem>
            <CommandItem>
              <FileText className="size-4" />
              DH-2402 · Anh Tú · Bếp ăn
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Sản phẩm">
            <CommandItem>
              <Package className="size-4" />
              Chả lụa
            </CommandItem>
            <CommandItem>
              <Package className="size-4" />
              Nem chua
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Khách hàng">
            <CommandItem>
              <Users className="size-4" />
              Chị Lan · Quán bún
            </CommandItem>
            <CommandItem disabled>
              <Truck className="size-4" />
              Nhập kho (đang bảo trì)
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  </div>
);
