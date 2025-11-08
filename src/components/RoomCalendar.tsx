import React from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { Booking } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Importa Button
import { XCircle } from "lucide-react"; // Importa XCircle

interface RoomCalendarProps {
  bookings: Booking[];
  selectedDate?: Date; // Nuova prop per la data selezionata
  onSelectDate?: (date: Date | undefined) => void; // Nuova prop per gestire la selezione della data
}

const RoomCalendar: React.FC<RoomCalendarProps> = ({ bookings, selectedDate, onSelectDate }) => {
  const bookedDays = bookings.map(booking => booking.startTime);

  const modifiers = {
    booked: bookedDays,
  };

  const modifiersStyles = {
    booked: {
      backgroundColor: "hsl(var(--accent))", // Colore più discreto per i giorni prenotati
      color: "hsl(var(--accent-foreground))",
      borderRadius: "0.25rem",
    },
  };

  const handleClearDateSelection = () => {
    if (onSelectDate) {
      onSelectDate(undefined);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl">Disponibilità Calendario</CardTitle>
        {selectedDate && (
          <Button variant="ghost" size="sm" onClick={handleClearDateSelection} className="text-sm text-muted-foreground">
            <XCircle className="mr-2 h-4 w-4" /> Cancella selezione
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex justify-center">
        <DayPicker
          mode="single" // Cambiato a modalità singola
          selected={selectedDate} // Usa la data selezionata
          onSelect={onSelectDate} // Gestisce la selezione della data
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          locale={it}
          showOutsideDays
          className="p-3"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            day_range_start: "day-range-start",
            day_range_end: "day-range-end",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", // Stile forte per il giorno selezionato
            day_today: "bg-accent text-accent-foreground",
            day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible", // Rimosso per mostrare i giorni dei mesi adiacenti
            // day_next_month: "hidden", // Rimosso per mostrare i giorni dei mesi adiacenti
            // day_previous_month: "hidden", // Rimosso per mostrare i giorni dei mesi adiacenti
          }}
        />
      </CardContent>
    </Card>
  );
};

export default RoomCalendar;