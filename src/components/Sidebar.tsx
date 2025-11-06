"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Home, CalendarCheck, LayoutDashboard } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const navLinks = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/rooms", icon: LayoutDashboard, label: "Sale Riunioni" },
  { to: "/my-bookings", icon: CalendarCheck, label: "Le mie Prenotazioni" },
];

const SidebarContent: React.FC<{ onClose?: () => void }> = ({ onClose }) => (
  <div className="flex flex-col space-y-2 p-4">
    {navLinks.map((link) => (
      <Link key={link.to} to={link.to} onClick={onClose}>
        <Button
          variant="ghost"
          className="w-full justify-start text-lg h-12 px-4 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <link.icon className="mr-3 h-5 w-5" />
          {link.label}
        </Button>
      </Link>
    ))}
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobile }) => {
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar">
          <SheetHeader className="p-4 border-b border-sidebar-border">
            <SheetTitle className="text-2xl font-bold text-sidebar-primary-foreground">Booking App</SheetTitle>
          </SheetHeader>
          <SidebarContent onClose={onClose} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border pt-16", // pt-16 to account for Navbar height
        "hidden md:flex flex-col"
      )}
    >
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;