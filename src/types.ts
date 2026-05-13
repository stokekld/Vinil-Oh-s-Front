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
  id?: number; // Optional for API response
  venueId?: string; // From API response
  name: string;
  lat?: number; // Optional for API
  latitude?: number; // From API response
  lng?: number; // Optional for API
  longitude?: number; // From API response
  events: Event[];
}

export interface ApiEventResponse {
  success: boolean;
  message: string;
  data: Venue[];
}

/* ============================================
   SESSION (ALBUM) TYPES
   ============================================ */

export interface Album {
  id: string;
  title: string;
  artists: string;
  coverArts: CoverArt[];
}

export interface NextSessionResponse {
  success: boolean;
  message: string;
  data: Album[];
  itemsCount: number;
}

// Fully normalized venue with guaranteed required fields
export interface NormalizedVenue {
  id: number;
  venueId?: string; // From API response
  name: string;
  lat: number;
  lng: number;
  events: Event[];
}
