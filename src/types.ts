export interface CoverArt {
  href: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  covertArts: CoverArt[];
}

export interface SessionResponse {
  success: boolean;
  message: string;
  data: Track[];
  itemsCount: number;
}

/* ============================================
   EVENTS TYPES
   ============================================ */

export interface EventLink {
  instagram?: string;
  facebook?: string;
}

export interface Event {
  id: number;
  name: string;
  date: string; // ISO format: "2026-03-28T20:00:00"
  links: EventLink;
}

export interface Venue {
  id: number;
  name: string;
  lat: number;
  lng: number;
  events: Event[];
}
