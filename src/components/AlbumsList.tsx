import type { Album } from '../types';

interface AlbumsListProps {
  albums: Album[];
  selectedAlbumId: string | null;
  onSelectAlbum: (albumId: string) => void;
}

export function AlbumsList({ albums, selectedAlbumId, onSelectAlbum }: AlbumsListProps) {
  return (
    <div className="session-list-panel">
      <div className="session-header">
        <h3>{albums.length} {albums.length === 1 ? 'album' : 'albums'}</h3>
      </div>
      <div className="session-list">
        {albums.map(album => (
          <div
            key={album.id}
            className={`session-album-item${album.id === selectedAlbumId ? ' active' : ''}`}
            data-id={album.id}
            onClick={() => onSelectAlbum(album.id)}
          >
            <div>
              <div className="track-title">{album.title}</div>
              <div className="track-artist">{album.artists}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
