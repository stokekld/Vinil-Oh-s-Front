import type { Album } from '../types';
import { TidalPlayer } from './TidalPlayer';

interface AlbumDetailProps {
  album: Album | null;
}

function createPlaceholder() {
  const placeholder = document.createElement('div');
  placeholder.className = 'cover-placeholder';
  placeholder.textContent = 'No Cover';
  return placeholder;
}

export function AlbumDetail({ album }: AlbumDetailProps) {
  if (!album) {
    return (
      <div className="session-detail-panel">
        <div className="no-selection">
          <p>Select an album</p>
        </div>
      </div>
    );
  }

  const coverUrl = album.coverArts[2]?.href || album.coverArts[0]?.href;

  return (
    <div className="session-detail-panel">
      <div className="track-detail">
        <div className="cover-art-container">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={album.title}
              className="cover-art"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.appendChild(createPlaceholder());
              }}
            />
          ) : (
            <div className="cover-placeholder">No Cover</div>
          )}
        </div>
        <div className="track-meta">
          <h2>{album.title}</h2>
          <div className="meta-row">
            <div className="meta-label">Artist</div>
            <div className="meta-value">{album.artists}</div>
          </div>
        </div>
        {album.id && <TidalPlayer tidalId={album.id} type="album" />}
      </div>
    </div>
  );
}
