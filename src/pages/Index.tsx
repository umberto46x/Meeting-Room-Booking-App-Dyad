import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import UpcomingBookings from "@/components/UpcomingBookings";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full"> {/* Ensure vertical centering within Layout */}
      <div className="text-center p-8 bg-card rounded-lg shadow-lg max-w-2xl w-full"> {/* Use bg-card for consistency */}
        <h1 className="text-4xl font-bold mb-4">Benvenuto nell'App di Prenotazione Sale Riunioni</h1>
        <p className="text-xl text-muted-foreground mb-6"> {/* Use text-muted-foreground for consistency */}
          La tua soluzione semplice e veloce per trovare e prenotare la sala riunioni perfetta.
          Esplora le nostre sale disponibili, visualizza i dettagli e gestisci le tue prenotazioni con facilità.
        </p>
        <Link to="/rooms">
          <Button size="lg" className="mt-4">
            Esplora le Sale Riunioni
          </Button>
        </Link>
      </div>
      <UpcomingBookings className="mt-8" />
    </div>
  );
};

export default Index;