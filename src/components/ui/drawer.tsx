"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

/**
 * Drawer
 */
interface CustomDrawerProps {
  shouldScaleBackground?: boolean;
}
type DrawerProps = CustomDrawerProps &
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>;
const Drawer: React.FC<DrawerProps> = ({
  shouldScaleBackground = true,
  ...props
}) => {
  return (
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  );
};
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;
/**
 * Overlay
 */
interface DrawerOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> {
  className?: string;
}
const DrawerOverlay = React.forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className = "", ...props }, ref) => (
    <DrawerPrimitive.Overlay
      ref={ref}
      className={cn(`fixed inset-0 z-50 bg-black/80 ${className}`)}
      {...props}
    />
  ),
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;
/**
 * Content
 */
interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  className?: string;
  children: React.ReactNode;
}
const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className = "", children, ...props }, ref) => (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          `fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background ${className}`,
        )}
        {...props}
      >
        <div
          className={cn("mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted")}
        />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  ),
);
DrawerContent.displayName = "DrawerContent";
/**
 * Header
 */
interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  className = "",
  ...props
}) => (
  <div
    className={cn(`grid gap-1.5 p-4 text-center sm:text-left ${className}`)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";
/**
 * Footer
 */
interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const DrawerFooter: React.FC<DrawerFooterProps> = ({
  className = "",
  ...props
}) => (
  <div
    className={cn(`mt-auto flex flex-col gap-2 p-4 ${className}`)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";
/**
 * Title
 */
interface DrawerTitleProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> {
  className?: string;
}
const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className = "", ...props }, ref) => (
    <DrawerPrimitive.Title
      ref={ref}
      className={cn(
        `text-lg font-semibold leading-none tracking-tight ${className}`,
      )}
      {...props}
    />
  ),
);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;
/**
 * Description
 */
interface DrawerDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> {
  className?: string;
}

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ className = "", ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn(`text-sm text-muted-foreground ${className}`)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

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
};
