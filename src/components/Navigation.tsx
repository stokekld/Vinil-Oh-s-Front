type Page = 'songs' | 'session' | 'events';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="main-nav">
      <a
        href="#"
        className={`nav-link ${currentPage === 'songs' ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onPageChange('songs');
        }}
      >
        Última Sesión
      </a>
      <a
        href="#"
        className={`nav-link ${currentPage === 'session' ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onPageChange('session');
        }}
      >
        Próxima Sesión
      </a>
      <a
        href="#"
        className={`nav-link ${currentPage === 'events' ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          onPageChange('events');
        }}
      >
        Eventos
      </a>
    </nav>
  );
}
