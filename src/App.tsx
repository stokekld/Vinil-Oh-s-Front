import { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { SongsPage } from './pages/SongsPage';
import { EventsPage } from './pages/EventsPage';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { useSession } from './hooks/useSession';

export function App() {
  const { tracks, loading, error } = useSession();
  const [currentPage, setCurrentPage] = useState<'songs' | 'events'>('songs');
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handlePageChange = (page: 'songs' | 'events') => {
    setCurrentPage(page);
  };

  const handleAboutClick = () => {
    setIsAboutModalOpen(true);
  };

  return (
    <>
      <Header />
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main id="events-main">
        <EventsPage />
      </main>
      <Footer
        onAboutClick={handleAboutClick}
      />
      <Modal
        isOpen={isAboutModalOpen}
        title="About"
        onClose={() => setIsAboutModalOpen(false)}
      >
        <p>Vinil Oh's Club un espacio para amantes de la música y coleccionistas, en físico y digital, donde lo más importante es la tolerancia y el descubrimiento.</p>
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Apóyanos en</h3>
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
