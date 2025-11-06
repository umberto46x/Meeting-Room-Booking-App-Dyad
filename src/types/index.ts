export interface Room {
  id: string;
  name: string;
  capacity: number;
  location: string; // e.g., "Floor 1, Room A"
  description?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  organizer: string;
}