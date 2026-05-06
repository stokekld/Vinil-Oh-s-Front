interface NavigationProps {
  currentPage: 'songs' | 'events';
  onPageChange: (page: 'songs' | 'events') => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="main-nav">
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
