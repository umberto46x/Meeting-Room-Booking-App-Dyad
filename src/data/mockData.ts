import { Room } from "@/types";

export const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "Sala Riunioni Alpha",
    capacity: 8,
    location: "Piano 1, Ala Est",
    description: "Sala moderna con proiettore e lavagna interattiva.",
  },
  {
    id: "room-2",
    name: "Sala Conferenze Beta",
    capacity: 20,
    location: "Piano 2, Ala Ovest",
    description: "Ampia sala per conferenze con sistema audio/video.",
  },
  {
    id: "room-3",
    name: "Ufficio Progetti Gamma",
    capacity: 4,
    location: "Piano 3, Ala Nord",
    description: "Piccola sala per riunioni veloci o sessioni di brainstorming.",
  },
  {
    id: "room-4",
    name: "Sala Creativa Delta",
    capacity: 12,
    location: "Piano Terra, Area Comune",
    description: "Spazio flessibile con arredi modulari e pareti scrivibili.",
  },
];