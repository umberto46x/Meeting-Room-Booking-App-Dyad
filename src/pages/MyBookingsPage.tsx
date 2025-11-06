import React, { useState, useEffect } from "react";
import { mockBookings, deleteBooking } from "@/data/mockData"; // Import deleteBooking directly
import { Booking } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookingCard from "@/components/BookingCard";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Search } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

const MyBookingsPage: React.FC = () => {
  const [organizerFilter, setOrganizerFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("dateAsc"); // Default sort by date ascending
  const [filteredAndSortedBookings, setFilteredAndSortedBookings] = useState<Booking[]>([]);

  useEffect(() => {
    let currentBookings = [...mockBookings]; // Start with all bookings

    // 1. Filter by organizer
    if (organizerFilter) {
      currentBookings = currentBookings.filter((booking) =>
        booking.organizer.toLowerCase().includes(organizerFilter.toLowerCase())
      );
    }

    // 2. Sort bookings
    currentBookings.sort((a, b) => {
      if (sortBy === "dateAsc") {
        return a.startTime.getTime() - b.startTime.getTime();
      }
      if (sortBy === "dateDesc") {
        return b.startTime.getTime() - a.startTime.getTime();
      }
      if (sortBy === "roomNameAsc") {
        // Assuming room name can be derived or is available. For now, let's use title as a proxy.
        // In a real app, you'd fetch room details or have room name in booking.
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "roomNameDesc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    setFilteredAndSortedBookings(currentBookings);
  }, [organizerFilter, sortBy, mockBookings]); // Depend on mockBookings to react to global changes

  const handleDeleteBooking = (bookingId: string) => {
    try {
      deleteBooking(bookingId); // Update the global mockBookings array
      // Re-trigger useEffect to re-filter and re-sort
      setFilteredAndSortedBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
      showSuccess("Prenotazione eliminata con successo!");
    } catch (error) {
      console.error("Errore durante l'eliminazione della prenotazione:", error);
      showError("Si è verificato un errore durante l'eliminazione della prenotazione.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Le mie Prenotazioni</h1>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 max-w-2xl mx-auto">
        <div className="relative flex-1 w-full">
          <Input
            type="text"
            placeholder="Cerca per organizzatore..."
            value={organizerFilter}
            onChange={(e) => setOrganizerFilter(e.target.value)}
            className="pr-10 w-full"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Ordina per..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dateAsc">Data (crescente)</SelectItem>
            <SelectItem value="dateDesc">Data (decrescente)</SelectItem>
            <SelectItem value="roomNameAsc">Nome Sala (A-Z)</SelectItem>
            <SelectItem value="roomNameDesc">Nome Sala (Z-A)</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setOrganizerFilter("")} variant="outline" className="w-full sm:w-auto">
          Reset Filtro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedBookings.length > 0 ? (
          filteredAndSortedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} onDelete={handleDeleteBooking} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">Nessuna prenotazione trovata.</p>
        )}
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default MyBookingsPage;