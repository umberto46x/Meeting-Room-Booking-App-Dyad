import React from "react";
import { Room } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Capacità: {room.capacity} persone</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{room.location}</span>
        </div>
        <Link to={`/rooms/${room.id}`}>
          <Button className="w-full mt-2">Visualizza Dettagli</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RoomCard;