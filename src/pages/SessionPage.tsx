import { useState, useEffect } from 'react';
import { AlbumsList } from '../components/AlbumsList';
import { AlbumDetail } from '../components/AlbumDetail';
import { TidalPlayer } from '../components/TidalPlayer';
import type { Album } from '../types';

interface SessionPageProps {
  albums: Album[];
  loading: boolean;
  error: string | null;
}

export function SessionPage({ albums, loading, error }: SessionPageProps) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768 && selectedAlbumId) {
      setIsMobileDetailOpen(true);
    }
  }, [selectedAlbumId]);

  const selectedAlbum = albums.find(a => a.id === selectedAlbumId) || null;

  const handleSelectAlbum = (albumId: string) => {
    setSelectedAlbumId(albumId);
  };

  const handleCloseDetail = () => {
    setIsMobileDetailOpen(false);
    setSelectedAlbumId(null);
  };

  if (loading) {
    return (
      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (albums.length === 0) {
    return (
      <div className="no-selection" style={{ gridColumn: '1 / -1' }}>
        <p>No hay álbumes disponibles</p>
      </div>
    );
  }

  return (
    <>
      {window.innerWidth >= 768 ? (
        <>
          <AlbumsList
            albums={albums}
            selectedAlbumId={selectedAlbumId}
            onSelectAlbum={handleSelectAlbum}
          />
          <AlbumDetail album={selectedAlbum} />
        </>
      ) : (
        <>
          {!isMobileDetailOpen ? (
            <div className="session-list-panel">
              <div className="session-header">
                <h3>{albums.length} {albums.length === 1 ? 'album' : 'albums'}</h3>
              </div>
              <div style={{ padding: 'var(--border-width)', overflowY: 'auto' }}>
                {albums.map(album => {
                  const coverUrl = album.coverArts[2]?.href || album.coverArts[0]?.href;
                  return (
                    <div
                      key={album.id}
                      className="session-album-card"
                      onClick={() => handleSelectAlbum(album.id)}
                    >
                      <div className="cover-art-container">
                        {coverUrl ? (
                          <img src={coverUrl} alt={album.title} className="cover-art" />
                        ) : (
                          <div className="cover-placeholder">No Cover</div>
                        )}
                      </div>
                      <div className="session-card-body">
                        <div className="track-meta">
                          <h2>{album.title}</h2>
                          <div className="meta-row">
                            <div className="meta-label">Artist</div>
                            <div className="meta-value">{album.artists}</div>
                          </div>
                        </div>
                      </div>
                      <div className="session-card-player">
                        {album.id && <TidalPlayer tidalId={album.id} type="album" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="detail-panel open">
              <div className="detail-close">
                <h3>Album Details</h3>
                <button className="close-btn" onClick={handleCloseDetail}>×</button>
              </div>
              {selectedAlbum && (
                <div className="track-detail">
                  <div className="cover-art-container">
                    {selectedAlbum.coverArts[2]?.href || selectedAlbum.coverArts[0]?.href ? (
                      <img
                        src={selectedAlbum.coverArts[2]?.href || selectedAlbum.coverArts[0]?.href}
                        alt={selectedAlbum.title}
                        className="cover-art"
                      />
                    ) : (
                      <div className="cover-placeholder">No Cover</div>
                    )}
                  </div>
                  <div className="track-meta">
                    <h2>{selectedAlbum.title}</h2>
                    <div className="meta-row">
                      <div className="meta-label">Artist</div>
                      <div className="meta-value">{selectedAlbum.artists}</div>
                    </div>
                  </div>
                  {selectedAlbum.id && <TidalPlayer tidalId={selectedAlbum.id} type="album" />}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
