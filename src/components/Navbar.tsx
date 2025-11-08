"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle"; // Import ThemeToggle

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
        <div className="flex items-center space-x-2"> {/* Added a div to group items on the right */}
          <ThemeToggle /> {/* Add ThemeToggle here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;