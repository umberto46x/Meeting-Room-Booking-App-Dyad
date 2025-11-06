import React from "react";
import { Booking } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { showSuccess, showError } from "@/utils/toast";

interface BookingCardProps {
  booking: Booking;
  onDelete: (bookingId: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onDelete }) => {
  const handleDelete = () => {
    try {
      onDelete(booking.id);
      showSuccess("Prenotazione eliminata con successo!");
    } catch (error) {
      console.error("Errore durante l'eliminazione della prenotazione:", error);
      showError("Si è verificato un errore durante l'eliminazione della prenotazione.");
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-xl">{booking.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(booking.startTime, "PPP", { locale: it })}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            {format(booking.startTime, "p", { locale: it })} - {format(booking.endTime, "p", { locale: it })}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Organizzatore: {booking.organizer}</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="mt-2 w-full">
              <Trash2 className="mr-2 h-4 w-4" /> Elimina Prenotazione
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sei assolutamente sicuro?</AlertDialogTitle>
              <AlertDialogDescription>
                Questa azione non può essere annullata. Verrà eliminata permanentemente la prenotazione di "{booking.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annulla</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Elimina</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default BookingCard;