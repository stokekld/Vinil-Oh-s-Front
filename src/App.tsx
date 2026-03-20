import { useState } from 'react';
import { Header } from './components/Header';
import { TracksList } from './components/TracksList';
import { TrackDetail } from './components/TrackDetail';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { useSession } from './hooks/useSession';

const clubDescription = "Vinil Oh's Club un espacio para amantes de la música y coleccionistas, en físico y digital, donde lo más importante es la tolerancia y el descubrimiento. En esta última sesión nuestros asistentes nos recomendaron las siguientes canciones, porque la buena música siempre viene de las personas adecuadas.";

export function App() {
  const { tracks, loading, error } = useSession();
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const selectedTrack = tracks.find(t => t.id === selectedTrackId) || null;
  const selectedIndex = selectedTrack ? tracks.indexOf(selectedTrack) : -1;

  const handleSelectTrack = (trackId: string) => {
    setSelectedTrackId(trackId);
  };

  const handleCloseDetail = () => {
    setSelectedTrackId(null);
  };

  const handleAboutClick = () => {
    setIsAboutModalOpen(true);
  };

  const handleSupportClick = () => {
    alert('Patreon coming soon! Follow our Instagram for updates.');
  };

  return (
    <>
      <Header 
        clubDescription={clubDescription}
      />
      <main>
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
            <TrackDetail 
              track={selectedTrack} 
              trackIndex={selectedIndex}
              onClose={handleCloseDetail}
            />
          </>
        )}
      </main>
      <Footer 
        onAboutClick={handleAboutClick}
        onSupportClick={handleSupportClick}
      />
      <Modal 
        isOpen={isAboutModalOpen} 
        title="About Vinil Oh's Club"
        onClose={() => setIsAboutModalOpen(false)}
      >
        <p>{clubDescription}</p>
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Connect with us</h3>
        <p>
          <a href="https://www.instagram.com/vinilohsclub/" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '0.5rem' }}>
            → Instagram: @vinilohsclub
          </a>
        </p>
        <p>
          <a href="https://www.patreon.com/cw/VinilOhsClub/membership" target="_blank" rel="noreferrer" style={{ display: 'block', marginBottom: '0.5rem' }}>
            → Patreon: VinilOhsClub
          </a>
        </p>
      </Modal>
    </>
  );
}
