"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { MadeWithDyad } from "./made-with-dyad";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Navbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} isMobile={isMobile} />

      <main
        className={cn(
          "flex-1 flex flex-col pt-16", // pt-16 to account for Navbar height
          !isMobile && "md:ml-64" // Adjust margin for desktop sidebar
        )}
      >
        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8"> {/* Added padding and centering */}
          {children}
        </div>
        <MadeWithDyad />
      </main>
    </div>
  );
};

export default Layout;