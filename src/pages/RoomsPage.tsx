import React, { useState, useEffect, useCallback } from "react";
import RoomCard from "@/components/RoomCard";
import { useBookings } from "@/context/BookingContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, XCircle } from "lucide-react";
import NoContentFound from "@/components/NoContentFound";

const RoomsPage: React.FC = () => {
  const { rooms } = useBookings();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minCapacity, setMinCapacity] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const uniqueLocations = Array.from(new Set(rooms.map(room => room.location)));

  const applyFilters = useCallback(() => {
    let currentRooms = [...rooms];

    // Filter by search term (name or description)
    if (searchTerm) {
      currentRooms = currentRooms.filter(
        (room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (room.description && room.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by minimum capacity
    if (minCapacity) {
      currentRooms = currentRooms.filter((room) => room.capacity >= parseInt(minCapacity));
    }

    // Filter by location
    if (locationFilter) {
      currentRooms = currentRooms.filter((room) => room.location === locationFilter);
    }

    setFilteredRooms(currentRooms);
  }, [rooms, searchTerm, minCapacity, locationFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setMinCapacity("");
    setLocationFilter("");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Sale Riunioni Disponibili</h1>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 max-w-4xl mx-auto">
        <div className="relative flex-1 w-full">
          <Input
            type="text"
            placeholder="Cerca per nome o descrizione..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 w-full"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Select onValueChange={setMinCapacity} value={minCapacity}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Capacità min." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4+ persone</SelectItem>
            <SelectItem value="8">8+ persone</SelectItem>
            <SelectItem value="12">12+ persone</SelectItem>
            <SelectItem value="20">20+ persone</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setLocationFilter} value={locationFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Posizione" />
          </SelectTrigger>
          <SelectContent>
            {uniqueLocations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleResetFilters} variant="outline" className="w-full sm:w-auto">
          <XCircle className="mr-2 h-4 w-4" /> Reset Filtri
        </Button>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <NoContentFound
          message="Nessuna sala riunioni trovata con i filtri attuali."
          linkTo="/rooms"
          linkText="Rimuovi i filtri"
          className="col-span-full"
        />
      )}
    </div>
  );
};

export default RoomsPage;