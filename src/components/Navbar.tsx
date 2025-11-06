"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md fixed w-full top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-primary-foreground">
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <Link to="/" className="text-2xl font-bold">
          Booking App
        </Link>
        {!isMobile && (
          <div className="space-x-4">
            {/* Links are now primarily in the sidebar for desktop, but keeping them here for top-level access or if sidebar is not desired */}
            <Link to="/">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                Home
              </Button>
            </Link>
            <Link to="/rooms">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                Sale Riunioni
              </Button>
            </Link>
            <Link to="/my-bookings">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                Le mie Prenotazioni
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;