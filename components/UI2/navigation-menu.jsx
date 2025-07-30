import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "../../lib/utils";

const NavigationMenu = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
);
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "flex items-center space-x-1 bg-slate-900/60 backdrop-blur-xl border border-slate-700/60 rounded-2xl px-3 py-2 list-none shadow-lg shadow-slate-900/20",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "inline-flex h-11 w-max items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ease-out text-slate-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-violet-400/40 backdrop-blur-sm group disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/15 data-[state=open]:bg-white/15 data-[active]:text-white data-[state=open]:text-white focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-slate-900"
);

const NavigationMenuTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      <span className="relative flex items-center">
        {children}
        {/* Animated underline */}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 group-hover:w-full group-data-[state=open]:w-full transition-all duration-300 ease-out rounded-full" />
      </span>
      <ChevronDown
        className="relative ml-2 h-3.5 w-3.5 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
);
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto bg-slate-900/98 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-2xl shadow-black/40",
        className
      )}
      {...props}
    />
  )
);
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className={cn("absolute left-0 top-full flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "origin-top-center relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/98 backdrop-blur-xl shadow-2xl shadow-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
);
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-2 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-slate-800 border-l border-t border-slate-700/60 shadow-lg" />
    </NavigationMenuPrimitive.Indicator>
  )
);
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};