export interface CoverArt {
  href: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  covertArts: CoverArt[];
  tidal_id?: string | number;
}

export interface SessionResponse {
  success: boolean;
  message: string;
  data: Track[];
  itemsCount: number;
}
