import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center h-full"> {/* Adjusted for Layout */}
      <div className="text-center p-8 bg-card rounded-lg shadow-lg"> {/* Added bg-card for consistency */}
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Pagina non trovata</p>
        <a href="/" className="text-primary hover:underline">
          Torna alla Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;