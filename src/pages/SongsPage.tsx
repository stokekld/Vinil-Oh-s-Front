import { useState, useEffect } from 'react';
import { TracksList } from '../components/TracksList';
import { TrackDetail } from '../components/TrackDetail';
import { TidalPlayer } from '../components/TidalPlayer';
import type { Track } from '../types';

interface SongsPageProps {
  tracks: Track[];
  loading: boolean;
  error: string | null;
}

export function SongsPage({ tracks, loading, error }: SongsPageProps) {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768 && selectedTrackId) {
      setIsMobileDetailOpen(true);
    }
  }, [selectedTrackId]);

  const selectedTrack = tracks.find(t => t.id === selectedTrackId) || null;
  const selectedIndex = selectedTrack ? tracks.indexOf(selectedTrack) : -1;

  const handleSelectTrack = (trackId: string) => {
    setSelectedTrackId(trackId);
  };

  const handleCloseDetail = () => {
    setIsMobileDetailOpen(false);
    setSelectedTrackId(null);
  };

  return (
    <>
      {loading ? (
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
          <TracksList
            tracks={tracks}
            selectedTrackId={selectedTrackId}
            onSelectTrack={handleSelectTrack}
          />
          {window.innerWidth >= 768 && (
            <TrackDetail
              track={selectedTrack}
              trackIndex={selectedIndex}
            />
          )}
          {window.innerWidth < 768 && isMobileDetailOpen && (
            <div className="detail-panel open">
              <div className="detail-close">
                <h3>Track Details</h3>
                <button className="close-btn" onClick={handleCloseDetail}>×</button>
              </div>
              <div className="track-detail">
                <div className="cover-art-container">
                  {selectedTrack?.covertArts?.[0]?.href ? (
                    <img
                      src={selectedTrack.covertArts[0].href}
                      alt={selectedTrack.album}
                      className="cover-art"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'cover-placeholder';
                        placeholder.textContent = 'No Cover';
                        e.currentTarget.parentElement?.appendChild(placeholder);
                      }}
                    />
                  ) : (
                    <div className="cover-placeholder">No Cover</div>
                  )}
                </div>
                {selectedTrack && (
                  <>
                    <div className="track-meta">
                      <h2>{selectedTrack.title}</h2>
                      <div className="meta-row">
                        <div className="meta-label">Artist</div>
                        <div className="meta-value">{selectedTrack.artist}</div>
                      </div>
                      <div className="meta-row">
                        <div className="meta-label">Album</div>
                        <div className="meta-value">{selectedTrack.album}</div>
                      </div>
                      <div className="meta-row">
                        <div className="meta-label">Order</div>
                        <div className="meta-value">#{selectedIndex + 1}</div>
                      </div>
                    </div>
                    {selectedTrack.id && <TidalPlayer tidalId={selectedTrack.id} />}
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
