import { useEffect, useState } from 'react';
import type { Track } from '../types';
import { TidalPlayer } from './TidalPlayer';

interface TrackDetailProps {
  track: Track | null;
  trackIndex: number;
}

export function TrackDetail({ track, trackIndex }: TrackDetailProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [track?.id]);

  if (!track) {
    return (
      <div className="detail-panel">
        <div className="no-selection">
          <p>Select a track to view details</p>
        </div>
      </div>
    );
  }

  const coverUrl = track.covertArts?.[3]?.href;

  return (
    <div className="detail-panel">
      <div className="track-detail">
        <div className="cover-art-container">
          {coverUrl && !imageError ? (
            <img
              src={coverUrl}
              alt={track.album}
              className="cover-art"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="cover-placeholder">No Cover</div>
          )}
        </div>
        <div className="track-meta">
          <h2>{track.title}</h2>
          <div className="meta-row">
            <div className="meta-label">Artist</div>
            <div className="meta-value">{track.artist}</div>
          </div>
          <div className="meta-row">
            <div className="meta-label">Album</div>
            <div className="meta-value">{track.album}</div>
          </div>
          <div className="meta-row">
            <div className="meta-label">Order</div>
            <div className="meta-value">#{trackIndex + 1}</div>
          </div>
        </div>
        {track.id && <TidalPlayer tidalId={track.id} />}
      </div>
    </div>
  );
}
