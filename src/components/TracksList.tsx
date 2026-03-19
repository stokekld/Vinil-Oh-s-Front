import type { Track } from '../types';

interface TracksListProps {
  tracks: Track[];
  selectedTrackId: string | null;
  onSelectTrack: (trackId: string) => void;
}

export function TracksList({ tracks, selectedTrackId, onSelectTrack }: TracksListProps) {
  return (
    <div className="playlist-panel">
      <div className="playlist-header">
        <h3>{tracks.length} tracks</h3>
      </div>
      <div className="tracks-list">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className={`track-item ${selectedTrackId === track.id ? 'active' : ''}`}
            onClick={() => onSelectTrack(track.id)}
            data-id={track.id}
          >
            <div className="track-title">{track.title}</div>
            <div className="track-artist">{track.artist}</div>
            <div className="track-number">#{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
